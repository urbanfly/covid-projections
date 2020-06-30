import React from 'react';
import ChartZones from './ChartZones';
import { DAILY_CASES_INFO_MAP } from 'common/metrics/daily_cases';
import { Column } from 'common/models/Projection';
import { formatInteger } from 'common/utils';

const CAP_Y = 1e10;

const getPointText = (valueY: number) => formatInteger(valueY);

const getTooltipBody = (valueY: number) =>
  `Daily new cases ${getPointText(valueY)}`;

const ChartDailyCases = ({
  columnData,
  height = 400,
}: {
  columnData: Column[];
  height?: number;
}) => (
  <ChartZones
    height={height}
    columnData={columnData}
    capY={CAP_Y}
    zones={DAILY_CASES_INFO_MAP}
    getTooltipBody={getTooltipBody}
    getPointText={getPointText}
  />
);

export default ChartDailyCases;
