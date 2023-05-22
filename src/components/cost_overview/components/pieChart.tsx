import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  LegendComponent,
  DatasetComponent
} from 'echarts/components';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import useOverviewStore from '@/stores/overview';
import { formatMoney } from '@/utils/format';
import { useMemo } from 'react';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  DatasetComponent
]);

export default function CostChart() {
  const cpu = useOverviewStore(state => state.cpu)
  const memory = useOverviewStore(state => state.memory)
  const storage = useOverviewStore(state => state.storage)
  const source = useMemo(() => [
    ['name', 'cost'],
    ['cpu', formatMoney(cpu).toFixed(2)],
    ['memory', formatMoney(memory).toFixed(2)],
    ['storage', formatMoney(storage).toFixed(2)]
  ] as const, [cpu, memory, storage])
  const amount = useMemo(()=>formatMoney(cpu + memory + storage), [cpu, memory, storage])
  const option = {
    // roseType: 'radius',
    // legend: {
    //   orient: 'vertical',
    //   top: '30%',
    //   right: 0,
    //   bottom: 0,
    //   icon: 'circle',
    // },
    dataset: {
      dimensions: source[0],
      source,
    },
    color: ['#7B838B', '#485058', '#24282C', '#BDC1C5'],
    series: [
      {
      type: 'pie',
      name: 'Cost Form',
      radius: ['30%', '50%'],
      avoidLabelOverlap: false,
      // center: ['30%', '50%'],
      // selectedMode: 'single',
      
      left: 'left',
      emptyCircleStyle: {
        borderCap: 'ronud'
      },
      label: {
        formatter: '{b}\n￥{@cost}({d}%)',
        lineHeight: 15,
      },
      emphasis: {
        label:{
          show:false
        }
      },
      encode: {
        itemName: 'name',
        value: 'cost',
      },
      itemStyle: {
        borderWidth: 1,
        borderColor: "#fff",
        left: 0,
      }
    },
    {
      type: 'pie',
      name: 'Cost Form',
      radius: ['30%', '50%'],
      avoidLabelOverlap: false,
      
      left: 'left',
      emptyCircleStyle: {
        borderCap: 'ronud'
      },
      label: {
        position:'center',
        show:true,
        formatter: function (params: any) {
          return '￥' + amount.toFixed(2)+'\n支出'
        }
      },
      emphasis: {
        label:{
          show:false
        }
      },
      encode: {
        itemName: 'name',
        value: 'cost',
      },
      itemStyle: {
        borderWidth: 1,
        borderColor: "#fff",
        left: 0,
      }
    }
  ]
    // ]
  };
  return <ReactEChartsCore
    echarts={echarts}
    option={option}
    notMerge={true}
    lazyUpdate={true}
    style={{
      aspectRatio: '5/3',
      width: '100%',
      flex: 1,
      pointerEvents: 'none'
    }}
  />
}

