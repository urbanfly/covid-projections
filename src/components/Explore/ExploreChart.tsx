import React, { FunctionComponent } from 'react';
import { scaleTime, scaleLinear, scaleBand, scaleLog } from '@vx/scale';
import { Group } from '@vx/group';
import { AxisLeft } from '@vx/axis';
import { Column } from 'common/models/Projection';
import { AxisBottom } from 'components/Charts/Axis';
import * as ChartStyle from 'components/Charts/Charts.style';
import RectClipGroup from 'components/Charts/RectClipGroup';
import { Series, ChartType, Scale } from './interfaces';
import SeriesChart from './SeriesChart';
import { getMinBy, getMaxBy } from './utils';
import { fail } from 'common/utils';

const getDate = (d: Column) => new Date(d.x);
const getY = (d: Column) => d.y;

const getYScale = (
  minY: number,
  maxY: number,
  range: number[],
  scaleType: Scale,
) => {
  if (scaleType === Scale.LINEAR) {
    return scaleLinear({
      domain: [minY, maxY],
      range,
    });
  } else if (scaleType === Scale.LOG) {
    return scaleLog({ domain: [1, maxY], range, nice: true });
  } else {
    fail('unknown scale type');
  }
};
const ExploreChart: FunctionComponent<{
  width: number;
  height: number;
  series: Series[];
  scaleType: Scale;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}> = ({
  width,
  height,
  series,
  scaleType,
  marginTop = 10,
  marginBottom = 30,
  marginLeft = 50,
  marginRight = 10,
}) => {
  const minX = getMinBy<Date>(series, getDate, new Date('2020-03-01'));
  const maxX = getMaxBy<Date>(series, getDate, new Date());
  const maxY = getMaxBy<number>(series, getY, 1);
  const minY = getMinBy<number>(series, getY, 1);

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const timeScale = scaleTime({
    domain: [minX, maxX],
    range: [0, innerWidth],
  });

  const yScale = getYScale(minY, maxY, [innerHeight, 0], scaleType);

  const barScale = scaleBand({
    range: [0, innerWidth],
    domain: series[0].data.map(getDate),
    padding: 0.4,
  });

  const barWidth = barScale.bandwidth();

  return (
    <svg width={width} height={height}>
      <Group key="main-chart" top={marginTop} left={marginLeft}>
        <RectClipGroup width={innerWidth} height={innerHeight}>
          {series.map((serie, i) => {
            const xScale = serie.type === ChartType.BAR ? barScale : timeScale;
            return (
              <SeriesChart
                key={`series-chart-${i}`}
                data={serie.data}
                x={d => xScale(getDate(d)) || 0}
                y={d => yScale(getY(d))}
                type={serie.type}
                yMax={innerHeight}
                barWidth={barWidth}
              />
            );
          })}
        </RectClipGroup>
      </Group>
      <Group key="axes" top={marginTop} left={marginLeft}>
        <ChartStyle.Axis>
          <AxisLeft scale={yScale} />
        </ChartStyle.Axis>
        <AxisBottom top={innerHeight} scale={timeScale} />
      </Group>
    </svg>
  );
};

export default ExploreChart;
