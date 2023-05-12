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
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';
import useOverviewStore from '@/stores/overview';
import { INITAL_SOURCE } from '@/constants/billing';

echarts.use([
  GridComponent,
  VisualMapComponent,
  DatasetComponent,
  MarkLineComponent,
  LineChart,
  // SVGRenderer,
  CanvasRenderer,
  TooltipComponent,
  UniversalTransition
]);

export default function Trend() {
  const source = useOverviewStore(data => data.source)
  const option = {
    xAxis: { type: 'category' },
    yAxis: { name: 'amount', type: 'value',boundaryGap: false },
    dataset: {
      dimensions: INITAL_SOURCE[0],
      source
    },
    color:['#24282C'],
    grid:{
      show: false
    },
    legend:{},
    tooltip: {
      trigger: 'axis',

      axisPointer: {
        type: 'line' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    series: [
      // {
      //   type: 'line',
      //   smooth: true,
      //   // symbol: 'none',
      //   // lineStyle: {
      //   //   color: '#24282C',
      //   //   width: '2.5px',
      //   // },
        
      //   showSymbol: false,
      //   datasetIndex: 0,
      //   encode: {
      //     // 将 "amount" 列映射到 y 轴。
      //     x: 'date',
      //     y: 'cpu',
      //   },
      // },
      // {
      //   type: 'line',
      //   smooth: true,
      //   // symbol: 'none',
      //   // lineStyle: {
      //   //   color: '#24282C',
      //   //   width: '2.5px',
      //   // },
      //   datasetIndex: 0,
      //   showSymbol: false,
      //   encode: {
      //     // 将 "amount" 列映射到 y 轴。
      //     x: 'date',
      //     y: 'memory',
      //   },
      // },
      // {
      //   type: 'line',
      //   smooth: true,
      //   showSymbol: false,
      //   // symbol: 'none',
      //   // lineStyle: {
      //   //   color: '#24282C',
      //   //   width: '2.5px',
      //   // },
      //   datasetIndex: 0,
      //   encode: {
      //     // 将 "amount" 列映射到 y 轴。
      //     x: 'date',
      //     y: 'storage',
      //   },
      // },
      {
        type: 'line',
        smooth: true,
        showSymbol: false,
        // lineStyle: {
        //   color: '#24282C',
        // },
        datasetIndex: 0,
        encode: {
          // 将 "amount" 列映射到 y 轴。
          x: 'date',
          y: 'amount',
        },
      }
    ]
  };
  console.log(source)
  return <ReactEChartsCore
    echarts={echarts}
    option={option}
    notMerge={true}
    lazyUpdate={true}
    onChartReady={(e) => console.log(e)}
  />
}