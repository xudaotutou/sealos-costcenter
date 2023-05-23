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
import { CanvasRenderer } from 'echarts/renderers';
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
      // show: false,
      // boundaryGap: false,
      // minInterval: 1000 * 60 * 60,
      minInterval: 24 * 60 * 60 * 1000, // 最小刻度为一天
      // maxInterval: 30 * 24 * 60 * 60 * 1000, // 最大刻度为一周
      symbolOffset: [10, 10],
      label: {
        show: true,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(177, 200, 222, 0.6)',
        },
      },
      axisLabel: {
        color: 'rgba(107, 112, 120, 1)',
      }
    },

    yAxis: {
      name: '元', 
      type: 'value', 
      boundaryGap: false,
      nameTextStyle:{
        color:'rgba(107, 112, 120, 1)'
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(177, 200, 222, 0.6)',
        },
      },
      splitLine:{
        lineStyle:{
          type:'dashed',
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(107, 112, 120, 1)',
      }
    },
    dataset: {
      dimensions: INITAL_SOURCE[0],
      source
    },
    grid: {
      // show: true,
      left: '40px',
      right: '5px',
    },
    color: ['#24282C'],
    // legend: {},
    tooltip: {
      trigger: 'axis',
      borderWidth: 0,
      axisPointer: {
        type: 'line'
      },
      // textStyle: {
      //   shadowBlur: 0,
      //   shadowColor: 'transparent'
      // },
      extraCssText: 'box-shadow: 0px 2px 4px rgba(161, 167, 179, 0.25), 0px 0px 1px rgba(121, 141, 159, 0.25);',
      backgroundColor: 'transparent',
      padding: '0px',

      formatter: function (params: any) {
        console.log(params)
        var res = `<p style="
        color: #5A646E;
        margin-bottom:8px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 150%;
        ">${params[0].data[0]}</p>
        
        <p 
        style="
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 150%;color:#24282C;">总消费 : ￥${params[0].value[4]}</p>`;
        const resDom = document.createElement('div');
        resDom.innerHTML = res
        resDom.setAttribute('style', `
           
        background: #FFFFFF;
        
        width: 162px;
        height: 79px;
        padding: 16px;
        border: 1px solid rgba(205, 213, 218, 1);
        border-radius: 4px;
        
        `)
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
        areaStyle: {
          // color: {
          //   type: 'linear',
          //   x: 0,
          //   y: 0,
          //   x2: 0,
          //   y2: 1,
          //   colorStops: [
          //     {
          //       offset: 1,
          //       color: '#DCE3E76B' // 0% 处的颜色
          //     },
          //     {
          //       offset: 0,
          //       color: '#E9EDEF00'
          //     }
          //   ],
          //   global: false
          // }
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(220, 227, 231, 0.8)'
            },
            {
              offset: 1,
              color: 'rgba(233, 237, 239, 0)'
            }
          ])
        },

      }
    ],

  };
  return <ReactEChartsCore
    echarts={echarts}
    option={option}
    notMerge={true}
    lazyUpdate={true}
    style={{ height: '310px', width: '100%', flex: 1 }}
  />
}