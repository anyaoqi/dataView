<template>
  <div class="chart-wrapper">
    <v-chart ref="chartRef" class="chart" :option="option" autoresize />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
import * as echarts from 'echarts/index.blank'
import { getAddTrend } from '@/apis/apiMember'

const chartRef = ref()
const option = ref({
  tooltip: {
    trigger: 'axis',
    formatter: '{b0}: {c0}%'
  },
  color: ['#00FBF4'],
  legend: {
    // left: '',
    right: 80,
    show: true,
    textStyle: {
      color: '#fff',
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: [],
    axisLabel: {
      fontSize: 20,
      color: '#fff',
    },
    splitLine: {
      show: false,
      lineStyle: {
        type: 'dashed',
        color: 'rgba(0, 162, 255, 0.4)',
      },
    },
  },
  yAxis: {
    name: '单位：%',
    type: 'value',
    nameTextStyle: {
      fontSize: 20,
      color: '#00D2FF',
      padding: [15, 0],
    },
    axisLabel: {
      fontSize: 20,
      color: '#00D2FF',
      formatter: '{value}%',
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: 'rgba(0, 162, 255, 0.4)',
      },
    },
  },
  series: [
    {
      name: '每月会员新增率',
      data: [],
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 4,
        color: '#23F0FF',
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(35, 240, 255, 0.7)' },
          { offset: 1, color: 'rgba(0,0,0,0)' },
        ]),
      },
    },
  ],
})

getAddTrend().then(({ data }) => {
  console.log(data)
  if (data && data[0]) {
    const chartData = data[0]
    chartRef.value.setOption({
      xAxis: {
        data: chartData.column,
      },
      series: [
        {
          name: chartData.name,
          data: chartData.value,
        },
      ],
    })
  }
})
</script>

<style lang="scss">
.chart-wrapper {
  height: 300px;
}
</style>
