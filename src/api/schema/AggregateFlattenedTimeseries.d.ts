/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Run 'yarn update-api-types' to regenerate.
 */

export type Date = string;
/**
 * Number of hospital beds projected to be in-use or that were actually in use (if in the past)
 */
export type Hospitalbedsrequired = number;
/**
 * Number of hospital beds projected to be in-use or actually in use (if in the past)
 */
export type Hospitalbedcapacity = number;
/**
 * Number of ICU beds projected to be in-use or that were actually in use (if in the past)
 */
export type Icubedsinuse = number;
/**
 * Number of ICU beds projected to be in-use or actually in use (if in the past)
 */
export type Icubedcapacity = number;
/**
 * Number of ventilators projected to be in-use.
 */
export type Ventilatorsinuse = number;
/**
 * Total ventilator capacity.
 */
export type Ventilatorcapacity = number;
/**
 * Historical or Inferred Rt
 */
export type Rtindicator = number;
/**
 * Rt standard deviation
 */
export type Rtindicatorci90 = number;
/**
 * Number of cumulative deaths
 */
export type Cumulativedeaths = number;
/**
 * Number of cumulative infections
 */
export type Cumulativeinfected = number;
/**
 * Number of current infections
 */
export type Currentinfected = number;
/**
 * Number of people currently susceptible
 */
export type Currentsusceptible = number;
/**
 * Number of people currently exposed
 */
export type Currentexposed = number;
export type Countryname = string;
/**
 * The state name
 */
export type Statename = string;
/**
 * The county name
 */
export type Countyname = string;
/**
 * Name of high-level intervention in-place
 */
export type Intervention = string;
/**
 * Fips for State + County. Five character code
 */
export type Fips = string;
/**
 * Latitude of point within the state or county
 */
export type Lat = number;
/**
 * Longitude of point within the state or county
 */
export type Long = number;
/**
 * Date of latest data
 */
export type Lastupdateddate = string;
/**
 * Flattened prediction timeseries data for multiple regions.
 */
export type AggregateFlattenedTimeseries = PredictionTimeseriesRowWithHeader[];

/**
 * Prediction timeseries row with location information.
 */
export interface PredictionTimeseriesRowWithHeader {
  date: Date;
  hospitalBedsRequired: Hospitalbedsrequired;
  hospitalBedCapacity: Hospitalbedcapacity;
  ICUBedsInUse: Icubedsinuse;
  ICUBedCapacity: Icubedcapacity;
  ventilatorsInUse: Ventilatorsinuse;
  ventilatorCapacity: Ventilatorcapacity;
  RtIndicator: Rtindicator;
  RtIndicatorCI90: Rtindicatorci90;
  cumulativeDeaths: Cumulativedeaths;
  cumulativeInfected: Cumulativeinfected;
  currentInfected: Currentinfected;
  currentSusceptible: Currentsusceptible;
  currentExposed: Currentexposed;
  countryName?: Countryname;
  stateName: Statename;
  countyName: Countyname;
  intervention: Intervention;
  fips: Fips;
  lat: Lat;
  long: Long;
  lastUpdatedDate: Lastupdateddate;
}
