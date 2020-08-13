import React, { FunctionComponent } from 'react';
import { LinePath } from '@vx/shape';
import * as Styles from './Explore.style';
import { ChartType } from './interfaces';
import { Column } from 'common/models/Projection';
import BarChart from 'components/Charts/BarChart';

const SeriesChart: FunctionComponent<{
  type: ChartType;
  data: Column[];
  x: (d: Column) => number;
  y: (d: Column) => number;
  yMax: number;
  barWidth: number;
}> = ({ type, data, x, y, yMax, barWidth }) => {
  switch (type) {
    case ChartType.LINE:
      return (
        <Styles.MainLineSeries>
          <LinePath data={data} x={x} y={y} />
        </Styles.MainLineSeries>
      );
    case ChartType.BAR:
      return (
        <Styles.BarsSeries>
          <BarChart data={data} x={x} y={y} yMax={yMax} barWidth={barWidth} />
        </Styles.BarsSeries>
      );
  }
};

export default SeriesChart;
