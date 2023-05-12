import * as echarts from 'echarts/core';
import {
  // TooltipComponent,
  LegendComponent,
  DatasetComponent
} from 'echarts/components';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';
import { CATEGORY, INITAL_SOURCE } from '@/constants/billing';
import useOverviewStore from '@/stores/overview';
import { formatMoney } from '@/utils/format';
import { useMemo } from 'react';

echarts.use([
  // TooltipComponent,
  LegendComponent,
  PieChart,
  SVGRenderer,
  LabelLayout,
  DatasetComponent
]);

export default function CostChart() {
  // const source = CATEGORY.map((x, i) => [x, ((i + 1) * 173) % 37])
  const cpu = useOverviewStore(state => state.cpu)
  const memory = useOverviewStore(state => state.memory)
  const storage = useOverviewStore(state => state.storage)
  // source.unshift(['name', 'cost'])
  const source = useMemo(() => [
    ['name', 'cost'],
    ['cpu', formatMoney(cpu)],
    ['memory', formatMoney(memory)],
    ['storage', formatMoney(storage)]
  ] as const, [cpu, memory, storage])
  console.log(source)
  // const source = useOverviewStore(state=>state.source)
  const option = {
    // roseType: 'radius',
    legend: {
      orient: 'vertical',
      top: '50%',
      right: 0,
      bottom: 0,
      icon: 'circle',
    },
    grid: {
      left: 0,
    },

    dataset: {
      dimensions: source[0],
      source,
    },
    color: ['#7B838B', '#485058', '#24282C', '#BDC1C5'],
    series: [{
      type: 'pie',
      name: 'Cost From',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      // selectedMode: 'single',
      label: {
        show: false,
        position: 'center',
      },
      left: 'left',

      emphasis: {
        scale: true,
        label: {
          show: true,
          formatter: '￥{@cost}\n支出',
          fontWeight: '500',
          color: '#5A646E',
          fontSize: 20,
          fontFamily: 'Inter',
          // lineHeight: '17px',
          // textalign: 'center',
        }
      },
      labelLine: {
        show: false
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
    }]
    // ]
  };
  return <ReactEChartsCore
    echarts={echarts}
    option={option}
    notMerge={true}
    lazyUpdate={true}
    onChartReady={(e) => console.log(e)}
  />
}

