<script setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
import * as echarts from 'echarts/index.blank'
import {getSalesTrendData} from '@/apis/apiBrand'

const dataList = ref([])
const titleList = ref([])

const getData = async () => {
  const result = await getSalesTrendData()
  for (let i = 0; i < result.data.data.length; i++) {
    const {order_date,amount} = result.data.data[i]
    titleList.value.push(order_date)
    dataList.value.push(amount/10000)
  }
}
getData()


const option = ref({
  grid: {
    top: 40,
    bottom: 80,
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: titleList.value,
    axisLabel: {
      fontSize: 20,
      color: '#00D2FF',
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: 'rgba(0, 162, 255, 0.4)',
      },
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      fontSize: 20,
      color: '#00D2FF',
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
      data: dataList.value,
      type: 'line',
      lineStyle: {
        width: 2,
        color: '#FFDD23',
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#FF8447' },
          { offset: 1, color: 'rgba(0,0,0,0)' },
        ]),
      },
    },
  ],
})
</script>

<template>
  <div class="chart-wrapper">
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<style lang="scss" scoped>
.chart-wrapper {
  height: 300px;
}
</style>
