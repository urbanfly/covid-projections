/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Run 'yarn update-api-types' to regenerate.
 */

/**
 * Projection about total hospital bed utilization
 */
export type Totalhospitalbeds = ResourceUsageProjection;
/**
 * Shortfall of resource needed at the peak utilization
 */
export type Peakshortfall = number;
/**
 * Date of peak resource utilization
 */
export type Peakdate = string;
/**
 * Date when resource shortage begins
 */
export type Shortagestartdate = string;
/**
 * Projection about ICU hospital bed utilization
 */
export type Icubeds = ResourceUsageProjection;
/**
 * Historical or Inferred Rt
 */
export type Rt = number;
/**
 * Rt standard deviation
 */
export type Rtci90 = number;

/**
 * Base model for API output.
 */
export interface Projections {
  totalHospitalBeds: Totalhospitalbeds;
  ICUBeds: Icubeds;
  Rt: Rt;
  RtCI90: Rtci90;
}
/**
 * Base model for API output.
 */
export interface ResourceUsageProjection {
  peakShortfall: Peakshortfall;
  peakDate: Peakdate;
  shortageStartDate: Shortagestartdate;
}
