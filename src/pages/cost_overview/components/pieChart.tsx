import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  LegendComponent,
  DatasetComponent
} from 'echarts/components';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';
import { CATEGORY } from '@/constants/billing';
import { useId } from 'react';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  SVGRenderer,
  LabelLayout,
  DatasetComponent
]);

export default function CostChart() {
  const source = CATEGORY.map((x, i) => [x, (i * 200) % 37])
  source.unshift(['name','value'])
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Cost From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        dataset:{
          source
        },
        series: [{ type: 'pie'}]
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

