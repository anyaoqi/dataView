<!-- 积分发放趋势 -->
<template>
  <div class="trend">
    <v-chart class="trend-chart" :option="option" autoresize />
  </div>
</template>

<script setup>
import VChart from 'vue-echarts'
// 按需加载
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { reactive } from 'vue'
import * as echarts from 'echarts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])

const option = reactive({
  tooltip: {
    trigger: 'axis',
  },

  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 65,
      end: 85,
      type: 'inside', //slider有滑块，inside内置
      // zoomLock: true,  //是否锁定区域大小（true,只能平移不能缩放）
    },
  ],

  grid: {
    left: '3%',
    right: '5%',
    top: '8%',
    bottom: '5%',
    containLabel: true,
  },
  color: ['#a4d8cc', '#25f3e6'],
  toolbox: {
    show: false,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },

  calculable: true,
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [
        '2023-09-27',
        '2023-09-28',
        '2023-09-29',
        '2023-09-30',
        '2023-10-01',
        '2023-10-02',
        '2023-10-03',
        '2023-10-04',
        '2023-10-05',
        '2023-10-06',
        '2023-10-07',
        '2023-10-08',
        '2023-10-09',
        '2023-10-10',
        '2023-10-11',
        '2023-10-12',
        '2023-10-13',
        '2023-10-14',
        '2023-10-15',
        '2023-10-16',
        '2023-10-17',
        '2023-10-18',
        '2023-10-19',
        '2023-10-20',
        '2023-10-21',
        '2023-10-22',
        '2023-10-23',
        '2023-10-24',
        '2023-10-25',
        '2023-10-26',
        '2023-10-27',
        '2023-10-28',
        '2023-10-29',
        '2023-10-30',
        '2023-10-31',
        '2023-11-01',
        '2023-11-02',
        '2023-11-03',
        '2023-11-04',
        '2023-11-05',
        '2023-11-06',
        '2023-11-07',
        '2023-11-08',
        '2023-11-09',
        '2023-11-10',
      ],
      axisLabel: {
        textStyle: {
          color: '#00D2FF',
          fontSize: '20',
        },
      },
      offset: 23,
    },
  ],
  yAxis: {
    type: 'value',
    axisLabel: {
      textStyle: {
        color: '#00D2FF',
        fontSize: '20',
      },
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(160,160,160,0.2)',
      },
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(160,160,160,0.2)',
      },
    },
  },

  series: [
    {
      lineStyle: {
        color: '#E6A858',
      },

      type: 'line',
      areaStyle: {
        normal: {
          type: 'default',
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            0.8,
            [
              {
                offset: 0,
                color: 'rgba(255,131,71,.6)',
              },
              {
                offset: 1,
                color: 'rgba(255,221,35,.1)',
              },
            ],
            false,
          ),
        },
      },
      // smooth: true,
      itemStyle: {
        normal: { areaStyle: { type: 'default' } },
      },
      data: [
        37850, 35010, 43300, 29810, 27110, 29940, 30510, 30490, 33770, 32270,
        33650, 39570, 50340, 55000, 58970, 60030, 67200, 71470, 90730, 112960,
        159450, 184620, 155690, 147850, 221600, 221590, 210100, 255120, 271070,
        243610, 245680, 239540, 247010, 331820, 351990, 363810, 317480, 290000,
        277350, 273570, 281710, 224800, 192050, 188410, 115370,
      ],
    },
  ],
})
</script>

<style lang="scss" scoped>
.trend {
  width: 100%;
  height: 373px;

  &-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
