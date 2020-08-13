import styled from 'styled-components';
import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';
import { Typography } from '@material-ui/core';
import theme from 'assets/theme';

/** Gets the chart palette based on the current theme. */
function palette(props: any) {
  return props.theme.palette.chart;
}

// TODO(pablo): Get from theme
const lightBlue = '#00BFEA';

export const Container = styled.div`
  margin-bottom: ${theme.spacing(4)}px;
`;

// HEADER
export const Header = styled.div`
  margin-bottom: ${theme.spacing(3)}px;
  /* TODO(pablo): Move the style to the corresponding element */
  .MuiTypography-h4 {
    margin-bottom: ${theme.spacing(1)}px;
  }
`;

export const Subtitle = styled(Typography)`
  text-transform: uppercase;
  line-height: 1.125rem;
  font-size: 0.875rem;
  font-weight: normal;
  letter-spacing: 0.05em;
  color: ${theme.palette.grey[500]};
`;

export const Tabs = styled(MuiTabs)`
  .MuiTabs-indicator {
    /* TODO(pablo): Get from theme */
    background-color: ${lightBlue};
  }
  border-bottom: solid 1px ${theme.palette.grey[300]};
`;

export const Tab = styled(MuiTab)`
  /* TODO(pablo): Use Typography */
  font-family: Roboto;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  text-transform: none;
  color: ${theme.palette.text.secondary};

  &.Mui-selected {
    font-weight: 500;
    color: ${theme.palette.text.primary};
  }
`;

// CHART CONTAINER
export const ChartContainer = styled.div`
  margin-top: ${theme.spacing(3)}px;
`;

// CHART CONTROLS
export const ChartControls = styled.div`
  margin-bottom: ${theme.spacing(3)}px;
`;

// CHART
export const MainLineSeries = styled.g`
  line,
  path {
    fill: none;
    stroke: ${props =>
      props.stroke ? props.stroke : palette(props).foreground};
    stroke-linecap: round;
    stroke-width: 3px;
  }
`;

export const BarsSeries = styled.g`
  rect {
    fill: ${props => (props.stroke ? props.stroke : palette(props).foreground)};
    fill-opacity: 0.2;
  }
`;
