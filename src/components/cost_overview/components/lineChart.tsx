import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
import {
  GridComponent,
  VisualMapComponent,
  MarkLineComponent,
  DatasetComponent,
  TooltipComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import {  CanvasRenderer } from 'echarts/renderers';
import useOverviewStore from '@/stores/overview';
import { INITAL_SOURCE } from '@/constants/billing';

echarts.use([
  GridComponent,
  VisualMapComponent,
  DatasetComponent,
  MarkLineComponent,
  LineChart,
  CanvasRenderer,
  TooltipComponent,
  UniversalTransition
]);

export default function Trend() {
  const source = useOverviewStore(data => data.source)
  const option = {
    xAxis: { 
      type: 'time',
      boundaryGap: false,
      minInterval: 1000 * 60 * 60,
    },
    
    yAxis: { name: '元', type: 'value', boundaryGap: false },
    dataset: {
      dimensions: INITAL_SOURCE[0],
      source
    },
    color: ['#24282C'],
    // legend: {},
    tooltip: {
      trigger: 'axis',

      axisPointer: {
        type: 'line' 
      },
      backgroundColor: 'transparent',
      padding: '0px',

      formatter: function (params: any) {
        var res = `<p style="color:#5A646E;">${params[0].axisValueLabel}</p>
        <p style="font-weight: 500;font-size: 14px;color:#24282C;">总消费 : ￥${params[0].value[4]}</p>`;
        const resDom = document.createElement('div');
        resDom.innerHTML = res
        resDom.setAttribute('style', `   
        background: rgba(238, 241, 248, 0.5);
        width: 162px;
        height: 79px;
        padding: 16px;
        backdrop-filter: blur(11.5px);
        border-radius: 4px;`)
        return resDom;
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
        datasetIndex: 0,
        encode: {
          // 将 "amount" 列映射到 y 轴。
          x: 'date',
          y: 'amount',
        },
      }
    ],

  };
  return <ReactEChartsCore
    echarts={echarts}
    option={option}
    notMerge={true}
    lazyUpdate={true}
    style={{ height: '280px', width: '100%', flex: 1}}
  />
}