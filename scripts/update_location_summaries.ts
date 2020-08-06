// You can run via `yarn update-location-summaries`
import fs from 'fs-extra';
import path from 'path';
import {
  fetchAllStateProjections,
  fetchAllCountyProjections,
} from '../src/common/utils/model';
import { currentSnapshot } from '../src/common/utils/snapshots';
import { LocationSummary } from '../src/common/location_summaries';

async function main() {
  const allStatesProjections = await fetchAllStateProjections();
  const allCountiesProjections = await fetchAllCountyProjections();

  const summaries = {} as { [fips: string]: LocationSummary };

  let actuals = 0;
  let modeled = 0;
  for (const stateProjections of allStatesProjections) {
    summaries[stateProjections.fips] = stateProjections.summary;
    stateProjections.report();
    const icu = stateProjections.primary.icuHeadroomInfo;
    if (icu && icu.covidPatientsIsActual) {
      actuals++;
    } else if (icu) {
      modeled++;
    }
  }

  for (const countyProjections of allCountiesProjections) {
    summaries[countyProjections.fips] = countyProjections.summary;
    countyProjections.report();
    const icu = countyProjections.primary.icuHeadroomInfo;
    if (icu && icu.covidPatientsIsActual) {
      actuals++;
    } else if (icu) {
      modeled++;
    }
  }

  console.log('Modeled:', modeled);
  console.log('Actuals:', actuals);
  const outputFolder = path.join(__dirname, '..', 'src', 'assets', 'data');
  await fs.writeJson(`${outputFolder}/summaries.json`, summaries);

  // We also store the historical summaries for email alerts purposes.
  const snapshotSummaryFile = path.join(
    __dirname,
    'alert_emails',
    'summaries',
    `${currentSnapshot()}.json`,
  );
  await fs.writeJSON(snapshotSummaryFile, summaries);

  console.log('done');
}

main().catch(e => {
  console.error(e);
  process.exit(-1);
});
