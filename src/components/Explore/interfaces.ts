import { Column } from 'common/models/Projection';

export enum ChartType {
  LINE,
  BAR,
}

export enum Scale {
  LINEAR,
  LOG,
}

export interface Series {
  data: Column[];
  type: ChartType;
}

export enum ExploreMetric {
  CASES,
  DEATHS,
  HOSPITALIZATIONS,
  ICU_HOSPITALIZATIONS,
}
