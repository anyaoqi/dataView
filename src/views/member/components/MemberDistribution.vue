<script setup>
// 会员分布情况
import { ref, reactive, provide, computed } from 'vue'
import VChart, { THEME_KEY } from 'vue-echarts'
// 按需加载
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent } from 'echarts/components'
import PieChartBg from './PieChartBg.vue'
import { getDistribution } from '@/apis/apiMember'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent])

provide(THEME_KEY, 'dark')

const color = ['#23F0FF', '#007FFD', '#03DF9E', '#FF8A37']
const chartData = reactive({
  list: [],
})

const sum = computed(() => {
  return chartData.list.reduce((prev, curr) => (prev += curr.value), 0)
})
const percComputed = computed(() => {
  return (value) => {
    return Number(((value / sum.value) * 100).toFixed(2))
  }
})

const option = ref({
  color: color,
  backgroundColor: 'transparent',
  series: [
    {
      name: '会员分布情况',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 0,
        borderColor: '#000',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        scale: true,
        scaleSize: 15,
        label: {
          show: false,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: chartData.list,
    },
  ],
})

const chartRef = ref()
getDistribution().then(({ code, data }) => {
  if (code === 200 && data) {
    chartData.list = data.list
    console.log('chartRef.value', chartRef.value)
    chartRef.value.setOption({
      series: {
        data: data.list,
      },
    })
  }
})
</script>

<template>
  <div class="chart-wrapper">
    <PieChartBg />
    <span class="center-icon">
      <img class="vip-icon" src="@/assets/images/member-icon.png" />
    </span>
    <v-chart
      v-if="chartData.list"
      ref="chartRef"
      class="chart"
      :option="option"
      autoresize
    />
  </div>
  <div class="data-wrapper" v-if="chartData.list && chartData.list.length">
    <div class="data-item" v-for="(item, index) in chartData.list" :key="index">
      <div class="border-lines">
        <span class="border-line border-line-left"></span>
        <span class="border-line border-line-right"></span>
        <span class="border-line border-line-top"></span>
        <span class="border-line border-line-bottom"></span>
      </div>
      <p class="item-row-one">
        <span>{{ item.name }}</span>
      </p>
      <p class="item-row-two">
        <span>{{ item.value }}</span>
        <span>占{{ percComputed(item.value) }}%</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-wrapper {
  width: 369px;
  height: 365px;
  margin: 50px auto;
  padding: 5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .center-icon {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .vip-icon {
      width: 59px;
      height: 73px;
    }
  }
}
.data-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 860px;
  margin-top: 50px;
  .data-item {
    position: relative;
    width: 360px;
    height: 116px;
    margin-bottom: 20px;
    padding: 10px 40px;
    background: url('@/assets/images/member/distribution-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    transition: all 1s;
    overflow: hidden;
    cursor: default;
    .border-lines {
      .border-line {
        position: absolute;
        width: 3px;
        height: 3px;
        background-color: #23f0ff;
        transition: all 0.5s;
      }
      .border-line-left {
        left: 0;
        bottom: 0;
        width: 2px;
        height: 100%;
        transform: translateY(100%);
      }
      .border-line-right {
        right: 0;
        top: 0;
        width: 3px;
        height: 100%;
        transform: translateY(-100%);
      }
      .border-line-top {
        right: 0;
        top: 0;
        width: 100%;
        transform: translateX(100%);
      }
      .border-line-bottom {
        left: 0;
        bottom: 0;
        width: 100%;
        transform: translateX(-100%);
      }
    }
    &:hover {
      background-size: 110% 110%;
      background-color: rgba(35, 240, 255, 0.1);
      .border-line-left {
        transform: translateY(0%);
      }
      .border-line-right {
        transform: translateY(0%);
      }
      .border-line-top {
        transform: translateX(0%);
      }
      .border-line-bottom {
        transform: translateX(0%);
      }
    }
    &:nth-of-type(1) {
      .item-row-one {
        &::before {
          background: v-bind('color[0]');
        }
      }
    }
    &:nth-of-type(2) {
      .item-row-one {
        &::before {
          background: v-bind('color[1]');
        }
      }
    }
    &:nth-of-type(3) {
      .item-row-one {
        &::before {
          background: v-bind('color[2]');
        }
      }
    }
    &:nth-of-type(4) {
      .item-row-one {
        &::before {
          background: v-bind('color[3]');
        }
      }
    }
    .item-row-one {
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      &::before {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: v-bind('color[0]');
      }
      span {
        color: #00d2ff;
        font-size: 24px;
        margin-left: 20px;
      }
    }
    .item-row-two {
      color: #fff;
      font-size: 32px;
      padding-left: 30px;
      span {
        margin-right: 18px;
      }
    }
  }
}
</style>
