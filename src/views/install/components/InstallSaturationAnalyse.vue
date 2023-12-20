<!-- E福通安装饱和度分析 -->
<template>
  <div class="analyes">
    <v-chart class="analyes-bar-chart" :option="option" autoresize />
  </div>
</template>

<script setup>
import VChart from 'vue-echarts'
// 按需加载
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { reactive } from 'vue'
import * as echarts from 'echarts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])

const dataX = [13.08, 12.69, 14.19, 11.65]
const yMax = 100
const dataShadow = []
for (let i = 0; i < dataX.length; i++) {
  dataShadow.push(yMax)
}
const option = reactive({
  title: {
    show: false,
  },
  xAxis: {
    data: ['思明区局', '湖里区局', '集美区局', '第一分局'],
    axisLabel: {
      color: '#00D2FF',
      fontSize: 20,
      margin: 14.58,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    z: 10,
  },
  yAxis: {
    max: yMax,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#999',
    },
    show: false,
  },

  grid: {
    show: false,
  },
  series: [
    {
      type: 'bar',
      itemStyle: {
        color: 'rgba(10, 81, 249, 0.125)',
      },
      emphasis: {
        itemStyle: {
          color: 'rgba(10, 81, 249, 0.1)',
        },
      },
      data: dataShadow,
      barWidth: 39.59,
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        fontSize: 30,
        formatter: function (params) {
          for (let i = 0; i < dataX.length; i++) {
            if (params.dataIndex === i) {
              return dataX[i] + '%'
            }
          }
        },
      },
      barGap: '-100%',
    },
    {
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#00FDF2' },
          { offset: 1, color: '#00CDFF' },
        ]),
      },

      data: dataX,
      barWidth: 39.59,
      label: {
        show: false,
        position: 'top',
        color: '#fff',
        fontSize: 30,
      },
    },
  ],
})
</script>

<style>
.analyes {
  width: 100%;
  height: 100%;
  padding-top: 45px;

  &-bar-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
