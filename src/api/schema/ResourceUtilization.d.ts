/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Run 'yarn update-api-types' to regenerate.
 */

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
 * Utilization of hospital resources.
 */
export interface ResourceUtilization {
  capacity: Capacity;
  totalCapacity: Totalcapacity;
  currentUsageCovid: Currentusagecovid;
  currentUsageTotal: Currentusagetotal;
  typicalUsageRate: Typicalusagerate;
}
