/**
 * Generates all of our share images (for Open Graph tags, etc.)
 *
 * Run via: yarn generate-share-images
 *
 * You must be running local server on port 3000 already (e.g. via `yarn start` or
 * `yarn serve -l 3000`)
 */
import fs from 'fs-extra';
import _ from 'lodash';
import path from 'path';
import puppeteer from 'puppeteer';
import urlJoin from 'url-join';
import {
  fetchAllStateProjections,
  fetchAllCountyProjections,
} from '../../src/common/utils/model';
import { Projections } from '../../src/common/models/Projections';
import { Metric, ALL_METRICS } from '../../src/common/metric';
import os from 'os-utils';

const ROOT_URL = 'http://localhost:3000/';
const URL_PREFIX = '/internal/share-image';
const CSS_SELECTOR = '.screenshot';
const OUTPUT_DIR = path.join(__dirname, 'output');

// Useful for debugging more quickly.
const STATES_ONLY = false;
// How many browser tabs to create and use for screenshots. 4 was optimal on my
// laptop. TODO: Tune on Github.
const TABS = 4;
// How long (ms) to wait for the expected div to render in the browser.
const TIMEOUT = 90 * 1000;
// We use history.push() instead of doing a full page reload normally, but tabs
// seem to slow down eventually, so we periodically do a fresh page load.
const SCREENSHOTS_BETWEEN_RELOADS = 100;
// How many times to retry after any failure.
const RETRIES = 2;

const SHARE_OUTPUT_SIZE = '1200x630';
const EXPORT_OUTPUT_SIZE = '2400x1350';

// The export image is 2400x1350.  Make sure the browser is plenty bigger.
const BROWSER_WIDTH = 2800;
const BROWSER_HEIGHT = 1575;

interface Screenshot {
  url: string;
  filename: string;
  outputSize: string;
}

let totalScreenshots = 0;
let screenshotsDone = 0;
let pendingScreenshots: string[] = [];
const start = Date.now();
setInterval(() => {
  os.cpuUsage(v => {
    const minutes = (Date.now() - start) / 1000 / 60;
    const spm = (screenshotsDone / minutes).toFixed(2);
    console.log(`Screenshots left: ${totalScreenshots - screenshotsDone}`);
    console.log(`Avg Screenshots/min: ${spm}`);
    console.log('Pending screenshots:', pendingScreenshots.join(', '));
    console.log(
      `CPU Usage (%): ${Math.floor(v * 100)} [total cores: ${os.cpuCount()}]`,
    );
    console.log(
      `Memory Free: ${Math.floor(os.freemem())} / ${Math.floor(os.totalmem())}`,
    );
  });
}, 60000);

(async () => {
  await fs.ensureDir(OUTPUT_DIR);
  await fs.emptyDir(OUTPUT_DIR);

  console.log('Fetching projections...');
  const allStatesProjections = await fetchAllStateProjections();
  const allCountiesProjections = STATES_ONLY
    ? []
    : await fetchAllCountyProjections();
  console.log('Fetch complete.');

  let screenshots = [] as Screenshot[];

  // Homepage share image.
  screenshots.push({
    url: '/',
    filename: 'home',
    outputSize: SHARE_OUTPUT_SIZE,
  });

  for (const stateProjections of allStatesProjections) {
    const state = stateProjections.stateCode.toLowerCase();
    addScreenshotsForLocation(
      screenshots,
      `/states/${state}`,
      stateProjections,
    );
  }

  for (const countyProjections of allCountiesProjections) {
    const fips = countyProjections.primary.fips;
    addScreenshotsForLocation(
      screenshots,
      `/counties/${fips}`,
      countyProjections,
    );
  }

  // For testing.
  //screenshots = screenshots.slice(0, 43);

  totalScreenshots = screenshots.length;

  const browser = await puppeteer.launch({
    defaultViewport: {
      width: BROWSER_WIDTH,
      height: BROWSER_HEIGHT,
    },
    headless: true, // Can set to false to help with debugging.
  });

  const promises = [];
  for (let i = 0; i < TABS; i++) {
    const tab = await browser.newPage();
    promises.push(takeScreenshots(screenshots, tab));
  }

  await Promise.all(promises);

  console.log('Completed successfully.');
  process.exit(0);
})().catch(err => {
  console.error(err);
  process.exit(1);
});

function addScreenshotsForLocation(
  screenshots: Screenshot[],
  relativeUrl: string,
  projections: Projections,
) {
  // Overall share image.
  screenshots.push({
    url: relativeUrl,
    filename: relativeUrl,
    outputSize: SHARE_OUTPUT_SIZE,
  });

  // Chart images.
  for (const metric of ALL_METRICS) {
    if (
      metric === Metric.FUTURE_PROJECTIONS ||
      projections.getMetricValue(metric) !== null
    ) {
      // TODO(michael): Unify the generation of these URLs somehow to make
      // sure we don't end up with accidental mismatches, etc.
      const shareUrl = urlJoin(relativeUrl, '/chart/', '' + metric);
      const exportUrl = urlJoin(shareUrl, '/export');
      screenshots.push({
        url: shareUrl,
        filename: shareUrl,
        outputSize: SHARE_OUTPUT_SIZE,
      });
      screenshots.push({
        url: exportUrl,
        filename: exportUrl,
        outputSize: EXPORT_OUTPUT_SIZE,
      });
    }
  }
}

async function takeScreenshots(
  screenshots: Screenshot[],
  tab: puppeteer.Page,
  screenshotsUntilReload: number = 0,
): Promise<void> {
  const next = screenshots.pop();
  if (!next) {
    return;
  }
  pendingScreenshots.push(next.url);
  console.log(`Screenshotting ${next.url} [${screenshots.length} left]`);
  if (
    !tab.url().includes('/internal/share-image') ||
    screenshotsUntilReload === 0
  ) {
    screenshotsUntilReload = SCREENSHOTS_BETWEEN_RELOADS;
    const url = urlJoin(ROOT_URL, URL_PREFIX, next.url);
    await tab.goto(url);
  } else {
    screenshotsUntilReload--;
    const url = urlJoin(URL_PREFIX, next.url);
    const windowHandle = await tab.evaluateHandle('window');
    await tab.evaluate(
      (window, url) => {
        window.reactHistory.replace(url);
      },
      windowHandle,
      url,
    );
  }
  const element = await tab.waitForSelector(CSS_SELECTOR, {
    timeout: TIMEOUT,
  });
  if (!element) {
    // TODO: Retries.
    throw new Error(`Failed to find ${CSS_SELECTOR} on ${next.url}`);
  }
  if (next.url.includes('/chart/')) {
    while (true) {
      const fullSvg = await element.$('svg');
      if (fullSvg) {
        const width = await tab.evaluate(
          svg => svg.getAttribute('width'),
          fullSvg,
        );
        if (width !== '0') {
          break;
        }
      }
      tab.waitFor(50);
    }
  }
  const filePath = path.join(OUTPUT_DIR, next.filename + '.png');
  await fs.ensureDir(path.join(filePath, '..'));
  await element.screenshot({
    path: filePath,
  });

  pendingScreenshots = pendingScreenshots.filter(s => s !== next.url);
  screenshotsDone++;

  // Kick off next screenshot.
  await takeScreenshots(screenshots, tab, screenshotsUntilReload);
}
