/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Run 'yarn update-api-types' to regenerate.
 */

/**
 * Total population in geographic region [*deprecated*: refer to summary for this]
 */
export type Population = number;
/**
 * Name of high-level intervention in-place
 */
export type Intervention = string;
/**
 * Number of confirmed cases so far
 */
export type Cumulativeconfirmedcases = number;
/**
 * Number of positive test results to date
 */
export type Cumulativepositivetests = number;
/**
 * Number of negative test results to date
 */
export type Cumulativenegativetests = number;
/**
 * Number of deaths so far
 */
export type Cumulativedeaths = number;
/**
 * *deprecated*: Capacity for resource. In the case of ICUs, this refers to total capacity. For hospitalization this refers to free capacity for COVID patients. This value is calculated by (1 - typicalUsageRate) * totalCapacity * 2.07
 */
export type Capacity = number;
/**
 * Total capacity for resource.
 */
export type Totalcapacity = number;
/**
 * Currently used capacity for resource by COVID
 */
export type Currentusagecovid = number;
/**
 * Currently used capacity for resource by all patients (COVID + Non-COVID)
 */
export type Currentusagetotal = number;
/**
 * Typical used capacity rate for resource. This excludes any COVID usage.
 */
export type Typicalusagerate = number;
/**
 * # of Contact Tracers
 */
export type Contacttracers = number;
export type Date = string;

/**
 * Actual data for a specific day.
 */
export interface ActualsTimeseriesRow {
  population: Population;
  intervention: Intervention;
  cumulativeConfirmedCases: Cumulativeconfirmedcases;
  cumulativePositiveTests: Cumulativepositivetests;
  cumulativeNegativeTests: Cumulativenegativetests;
  cumulativeDeaths: Cumulativedeaths;
  hospitalBeds: ResourceUtilization;
  ICUBeds: ResourceUtilization;
  contactTracers?: Contacttracers;
  date: Date;
}
/**
 * Utilization of hospital resources.
 */
export interface ResourceUtilization {
  capacity: Capacity;
  totalCapacity: Totalcapacity;
  currentUsageCovid: Currentusagecovid;
  currentUsageTotal: Currentusagetotal;
  typicalUsageRate: Typicalusagerate;
}
