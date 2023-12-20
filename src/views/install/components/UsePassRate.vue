<!-- 使用合格率 -->
<template>
  <div class="rate">
    <v-chart
      class="rate-chart"
      :option="item.option"
      v-for="(item, index) in dataList"
      :key="index"
      autoresize
    />

    <!-- <dv-charts class="rate-chart" :option="item.option" v-for="(item, index) in dataList" :key="index" /> -->
  </div>
</template>

<script setup>
import installApi from '@/apis/apiInstall'
import { ref, reactive, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart } from 'echarts/charts'
import * as echarts from 'echarts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])

onMounted(() => {
  getUsePassRateData()
})

const dataList = ref([]) // 数据
function getUsePassRateData() {
  installApi.getUsePassRateData().then((res) => {
    dataList.value = res.data.data
    getOption()
  })
}

function getOption() {
  dataList.value.forEach((item) => {
    const option = reactive({
      // tooltip: {
      //     formatter: '{a} <br/>{b} : {c}%'
      // },
      series: [
        {
          radius: '83%',
          name: '使用合格率',
          type: 'gauge',
          splitNumber: 3, // 仪表盘刻度的分割段数,默认 10
          progress: {
            show: true,
            overlap: true,
            roundCap: true,
          },
          title: {
            // 仪表盘标题。
            show: true, // 是否显示标题,默认 true。
            offsetCenter: [0, '180%'], //相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
            color: '#00D2FF', // 文字的颜色,默认 #333。
            fontSize: 24, // 文字的字体大小,默认 15。
            fontWeight: 500,
          },
          detail: {
            valueAnimation: false,
            formatter: '{value}%',
            offsetCenter: [0, '120%'],
            color: '#fff',
          },
          data: [
            {
              value: 50,
              name: '',
            },
          ],

          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#15A1F9' },
              { offset: 1, color: '#09F2F5' },
            ]),
          },

          splitLine: {
            length: 6,
            lineStyle: {
              color: '#15A1F9',
              width: 3,
            },
          },

          axisTick: {
            // 刻度(线)样式。
            show: true, // 是否显示刻度(线),默认 true。
            splitNumber: 9, // 分隔线之间分割的刻度数,默认 5。
            length: 6, // 刻度线长。支持相对半径的百分比,默认 8。
            lineStyle: {
              // 刻度线样式。
              color: '#eee', //线的颜色,默认 #eee。
              opacity: 1, //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
              width: 1, //线度,默认 1。
              type: 'solid', //线的类型,默认 solid。 此外还有 dashed,dotted
              shadowBlur: 10, //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
              shadowColor: '#fff', //阴影颜色。支持的格式同color。
            },
          },

          axisLabel: {
            // 刻度标签。
            show: false, // 是否显示标签,默认 true。
          },

          pointer: {
            // 仪表盘指针。
            show: true, // 是否显示指针,默认 true。
            width: 5, // 指针宽度,默认 8。
            itemStyle: {
              borderCap: 'round',
            },
          },

          center: ['50%', '40%'],
        },
      ],
    }) // 图表配置
    option.series[0].data[0].value = item.e_pass_rate
    option.series[0].data[0].name = item.department_name
    item.option = option
  })
}
</script>

<style lang="scss" scoped>
.rate {
  width: 100%;
  height: calc(100% - 44px);
  display: flex;

  &-chart {
    // width: 100%;
    width: 25%;
    height: 100%;
  }
}
</style>
