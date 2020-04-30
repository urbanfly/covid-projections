import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartBrokenAxis from 'highcharts/modules/broken-axis';
import HighchartAnnotations from 'highcharts/modules/annotations';
import 'highcharts/css/highcharts.css';

HighchartBrokenAxis(Highcharts);
HighchartAnnotations(Highcharts);
HighchartsMore(Highcharts);

const Chart = ({ options }: { options: Highcharts.Options }) => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
