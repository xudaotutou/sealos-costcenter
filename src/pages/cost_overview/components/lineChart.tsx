import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
import {
  GridComponent,
  GridComponentOption,
  VisualMapComponent,
  VisualMapComponentOption,
  MarkLineComponent,
  MarkLineComponentOption,
  DatasetComponent,
  TooltipComponent
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([
  GridComponent,
  VisualMapComponent,
  DatasetComponent,
  MarkLineComponent,
  LineChart,
  SVGRenderer,
  TooltipComponent,
  UniversalTransition
]);

export default function Trend() {
  const source = [
    ['date', 'value'],
    ['2019-10-10', 200],
    ['2019-10-11', 560],
    ['2019-10-12', 750],
    ['2019-10-13', 580],
    ['2019-10-14', 250],
    ['2019-10-15', 300],
    ['2019-10-16', 450],
    ['2019-10-17', 300],
    ['2019-10-18', 100]
  ]
  const option = {
    xAxis: { type: 'category'},
    yAxis: {},
    dataset: {
      dimensions: [
        'date',
        // 可以简写为 string ，表示 dimension name 。
        'value',
      ],
      source
    },
    series: [
      {
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: '#24282C',
          width: '2.5px',
        },
        encode: {
          // 将 "amount" 列映射到 X 轴。
          x: 'date',
          y: 'value'
        },
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        //   }
        // },
      }
    ]
  };
  return <ReactEChartsCore
    echarts={echarts}
    option={option}
    notMerge={true}
    lazyUpdate={true}
    onChartReady={(e) => console.log(e)}
  />
}