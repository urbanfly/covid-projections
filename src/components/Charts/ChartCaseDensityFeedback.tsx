import React, { FunctionComponent } from 'react';
import moment from 'moment';
import { isDate } from 'lodash';
import { min as d3min, max as d3max } from 'd3-array';
import { curveMonotoneX } from '@vx/curve';
import { LinePath } from '@vx/shape';
import { GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import { scaleLinear, scaleTime } from '@vx/scale';
import { ParentSize } from '@vx/responsive';
import { Column } from 'common/models/Projection';
import { CASE_DENSITY_LEVEL_INFO_MAP } from 'common/metrics/case_density';
import { LevelInfoMap } from 'common/level';
import { formatUtcDate, formatDecimal } from 'common/utils';
import { AxisBottom, AxisLeft } from './Axis';
import BoxedAnnotation from './BoxedAnnotation';
import ChartContainer from './ChartContainer';
import RectClipGroup from './RectClipGroup';
import ZoneAnnotation from './ZoneAnnotation';
import Tooltip from './Tooltip';
import LinePathRegion from './LinePathRegion';
import * as TooltipStyle from './Tooltip.style';
import * as Style from './Charts.style';
import {
  computeTickPositions,
  getChartRegions,
  getZoneByValue,
  last,
  getAxisLimits,
} from './utils';

type Point = {
  x: number;
  y: any;
};

const getDate = (d: Point) => new Date(d.x);
const getY = (d: Point) => d?.y;
const hasData = (d: any) => isDate(getDate(d)) && Number.isFinite(getY(d));

const ChartCaseDensity: FunctionComponent<{
  series: Column[][];
  zones: LevelInfoMap;
  capY?: number;
  width: number;
  height: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}> = ({
  series,
  zones,
  capY = 100,
  width,
  height,
  marginTop = 5,
  marginBottom = 40,
  marginLeft = 40,
  marginRight = 5,
}) => {
  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const data1: Point[] = series[0].filter(hasData);
  const data2: Point[] = series[1].filter(hasData);

  const dates = data1.map(getDate);
  const minDate = d3min(dates) || new Date('2020-01-01');
  const maxDate = moment().add(2, 'weeks').toDate();

  const xScale = scaleTime({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  const yDataMax = d3max(data1, getY) || 100;
  const yAxisLimits = getAxisLimits(0, yDataMax, zones);
  const [yAxisMin, yAxisMax] = [-9, yAxisLimits[1]];

  const yScale = scaleLinear({
    domain: [yAxisMin, yAxisMax],
    range: [chartHeight, 0],
  });

  const getXCoord = (p: Point) => xScale(getDate(p));
  const getYCoord = (p: Point) => yScale(getY(p));

  const regions = getChartRegions(yAxisMin, yAxisMax, zones);
  const lastPoint = last(data1);
  const activeZone = getZoneByValue(getY(lastPoint), zones);

  const yTicks = computeTickPositions(yAxisMin, yAxisMax, zones);

  const renderTooltip = (p: Point) => (
    <Tooltip
      left={marginLeft + getXCoord(p)}
      top={marginTop + getYCoord(p)}
      title={formatUtcDate(getDate(p), 'MMM D, YYYY')}
    >
      <TooltipStyle.Body>
        {`Case density ${formatDecimal(getY(p), 1)}/100k`}
      </TooltipStyle.Body>
    </Tooltip>
  );
  const renderMarker = (p: Point) => (
    <Style.CircleMarker
      cx={getXCoord(p)}
      cy={getYCoord(p)}
      r={6}
      fill={getZoneByValue(getY(p), zones).color}
    />
  );

  return (
    <ChartContainer<Point>
      data={[...data1, ...data2]}
      x={getXCoord}
      y={getYCoord}
      renderMarker={renderMarker}
      renderTooltip={renderTooltip}
      width={width}
      height={height}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
      <RectClipGroup width={chartWidth} height={chartHeight} topPadding={5}>
        <LinePathRegion
          data={data1}
          x={getXCoord}
          y={getYCoord}
          regions={regions}
          width={chartWidth}
          yScale={yScale}
          curve={curveMonotoneX}
        />
        {regions.map((region, i) => (
          <Group key={`chart-region-2-${i}`}>
            <Style.SeriesDashed stroke={region.color}>
              <RectClipGroup
                y={yScale(region.valueTo)}
                width={width}
                height={yScale(region.valueFrom) - yScale(region.valueTo)}
              >
                <LinePath
                  data={data2}
                  x={getXCoord}
                  y={getYCoord}
                  curve={curveMonotoneX}
                />
              </RectClipGroup>
            </Style.SeriesDashed>
          </Group>
        ))}
        <Style.LineGrid>
          <GridRows width={chartWidth} scale={yScale} tickValues={yTicks} />
        </Style.LineGrid>
        <Style.TextAnnotation>
          <BoxedAnnotation
            x={getXCoord(lastPoint) + 30}
            y={getYCoord(lastPoint)}
            text={formatDecimal(getY(lastPoint), 1)}
          />
        </Style.TextAnnotation>
      </RectClipGroup>
      {regions.map((region, i) => (
        <ZoneAnnotation
          key={`zone-annotation-${i}`}
          color={region.color}
          name={region.name}
          isActive={activeZone.name === region.name}
          x={xScale(maxDate) - 10}
          y={yScale(0.5 * (region.valueFrom + region.valueTo))}
        />
      ))}
      <AxisBottom top={chartHeight} scale={xScale} />
      <AxisLeft scale={yScale} tickValues={yTicks.slice(1)} />
    </ChartContainer>
  );
};

const ChartCaseDensityAutosize: FunctionComponent<{
  series: Column[][];
  height?: number;
}> = ({ series, height = 400 }) => (
  <Style.ChartContainer>
    <ParentSize>
      {({ width }) => (
        <ChartCaseDensity
          width={width}
          height={height}
          series={series}
          zones={CASE_DENSITY_LEVEL_INFO_MAP}
        />
      )}
    </ParentSize>
  </Style.ChartContainer>
);

export { ChartCaseDensity };
export default ChartCaseDensityAutosize;
