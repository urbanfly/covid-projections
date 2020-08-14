import { assert } from 'common/utils';
import DataUrlJson from 'assets/data/data_url.json';

export const SNAPSHOT_URL = DataUrlJson.data_url;

export async function fetchMasterSnapshotNumber(): Promise<number> {
  const response = await fetch(
    'https://raw.githubusercontent.com/covid-projections/covid-projections/master/src/assets/data/data_url.json',
  );
  const json = await response.json();
  return snapshotFromUrl(json['data_url']);
}

export function snapshotFromUrl(url: string): number {
  assert(url, 'Empty URL provided');
  const match = /(\d+)\/?$/.exec(url);
  assert(match, `${url} did not match snapshot URL regex.`);
  return parseInt(match[1]);
}

export function snapshotUrl(snapshotNum: string | number) {
  return `https://data.covidactnow.org/snapshot/${snapshotNum}`;
}

export function currentSnapshot(): number {
  return snapshotFromUrl(SNAPSHOT_URL);
}