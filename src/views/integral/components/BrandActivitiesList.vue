<!-- 品牌活动一览 -->
<template>
  <div class="brand-activity-list">
    <ul class="brand-activity-list-item">
      <li>
        <img
          src="../../../assets/images/integral/brand-activity-total.png"
          class="img"
        />
        <div class="text">
          <p>品牌活动总数</p>
          <p>7</p>
        </div>
      </li>

      <li>
        <img
          src="../../../assets/images/integral/activity-underway.png"
          class="img"
        />
        <div class="text">
          <p>进行中活动</p>
          <p>1</p>
        </div>
      </li>

      <li>
        <img
          src="../../../assets/images/integral/join-member.png"
          class="img"
        />
        <div class="text">
          <p>参与会员</p>
          <p>16,864</p>
        </div>
      </li>
    </ul>

    <!-- 圆环 -->
    <div class="brand-activity-list-gaugeChart-box">
      <div class="gaugeChart">
        <v-chart
          class="width100 heigth100"
          :option="optionGaugeChart"
          autoresize
        />
      </div>
      <ul class="info">
        <li class="">
          <p class="block color-1"></p>
          <div class="info-div">
            <p class="title">累计发放积分</p>
            <p>5,041,865</p>
          </div>
          <div class="info-div">
            <p class="title">占比</p>
            <p>75%</p>
          </div>
        </li>

        <li class="">
          <p class="block color-2"></p>
          <div class="info-div">
            <p class="title">累计核销积分</p>
            <p>3,621,920</p>
          </div>
          <div class="info-div">
            <p class="title">占比</p>
            <p>65%</p>
          </div>
        </li>

        <li class="">
          <p class="block color-3"></p>
          <div class="info-div">
            <p class="title">剩余积分</p>
            <p>1,413,034</p>
          </div>
          <div class="info-div">
            <p class="title">占比</p>
            <p>25%</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 进度池 -->
    <ul class="brand-activity-list-progress">
      <li class="">
        <div class="info">
          <p class="title">活动引流数</p>
          <p class="num">16864</p>
        </div>
        <dv-percent-pond
          :config="configDrainageNumber"
          style="width: 100%; height: 20px"
        />
      </li>

      <li class="">
        <div class="info">
          <p class="title">活动领卡数</p>
          <p class="num">12,038</p>
        </div>
        <dv-percent-pond
          :config="configCardNumber"
          style="width: 100%; height: 20px"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import VChart from 'vue-echarts'
// 按需加载
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart, PictorialBarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  GaugeChart,
  PictorialBarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])
import { ref } from 'vue'
const optionGaugeChart = ref({
  color: ['#00FDF2', '#000414', '#00FF83', '#000414', '#FFBD48'], //环的颜色
  series: [
    {
      max: 100,
      type: 'gauge', //仪表盘
      startAngle: 90,
      endAngle: -270,
      center: ['50%', '50%'], //中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
      pointer: {
        //仪表盘指针
        show: false,
      },
      progress: {
        //展示当前进度
        show: true,
        overlap: false, //多组数据时进度条是否重叠
        roundCap: true,
        clip: false,
      },
      axisLine: {
        //仪表盘轴线相关配置
        lineStyle: {
          //仪表盘轴线样式
          width: 60,
          color: [[1, 'rgba(10, 81, 249, 0.125)']],
        },
      },
      splitLine: {
        //分隔线样式
        show: false,
        distance: 0, //分隔线与轴线的距离
        length: 10,
      },
      axisTick: {
        //刻度样式
        show: false,
      },
      axisLabel: {
        //刻度标签
        show: false,
        distance: 50, //标签与刻度线的距离
      },
      data: [
        {
          //系列中的数据内容数组
          value: 75,
          name: '累计发放积分',
          title: {
            //仪表盘标题
            show: false,
            offsetCenter: ['200%', '-90%'],
            color: '#fff',
          },
          detail: {
            offsetCenter: ['160%', '-65%'],
          },
        },
        {
          value: 100,
          detail: {
            show: false,
          },
        },
        {
          value: 65,
          name: '累计核销积分',
          title: {
            //仪表盘标题
            show: false,
          },
        },
        {
          value: 100,
          detail: {
            show: false,
          },
        },
        {
          value: 25,
          name: '剩余积分',
          title: {
            //仪表盘标题
            show: false,
          },
        },
      ],
      title: {
        fontSize: 14,
      },
      detail: {
        //仪表盘详情，用于显示数据
        show: false,
      },
    },
  ],
})

// 活动引流数
const configDrainageNumber = ref({
  value: 85,
  // lineDash: [7, 1],
  colors: ['#FF8447', '#FFDD23'],
  borderWidth: 0,
  formatter: '',
  localGradient: true,
})

// 活动领卡数
const configCardNumber = ref({
  value: 70,
  // lineDash: [7, 1],
  colors: ['#3EB7FC', '#23FF95'],
  borderWidth: 0,
  formatter: '',
  localGradient: true,
})
</script>

<style lang="scss" scoped>
.brand-activity-list {
  width: 100%;
  color: #fff;

  &-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 38px 0 61px;

    li {
      // width: 33.33%;
      font-size: 40px;
      color: #fff;
      display: flex;

      // align-items: center;
      .img {
        width: 64px;
        height: 74px;
      }

      .text {
        margin-left: 19px;
      }

      p:nth-child(1) {
        color: $color-primary;
        font-size: 24px;
        padding-bottom: 18px;
      }
    }
  }

  &-gaugeChart-box {
    width: 745px;
    height: 292px;
    background: url(../../../assets/images/integral/doughnut-chart.png)
      no-repeat;
    position: relative;
    display: flex;
    justify-content: space-between;

    .gaugeChart {
      width: 342px;
      height: 100%;
      // position: absolute;
      left: 45px;
    }

    .info {
      flex: 1;
      font-size: 32px;
      padding-left: 20px;

      li {
        display: flex;
        justify-content: space-around;
        height: 96px;
        align-items: center;

        // margin-left: 40px;

        .info-div {
          width: 33.33%;
        }

        .block {
          display: block;
          width: 22px;
          height: 22px;
          border-radius: 4px 4px 4px 4px;
        }

        .title {
          color: $color-primary;
          font-size: 22px;
          white-space: nowrap;
        }

        .color-1 {
          background: linear-gradient(to top, #00fdf2, #00cdff);
        }

        .color-2 {
          background: linear-gradient(to top, #00ff83, #03de9e);
        }

        .color-3 {
          background: linear-gradient(to top, #ffbd48, #faf773);
        }
      }
    }
  }

  &-progress {
    width: 745px;
    display: flex;
    justify-content: space-between;

    li {
      font-size: 32px;
      font-weight: bold;
      width: 360px;
      height: 136px;
      border-radius: 4px 4px 4px 4px;
      background: #0065fd0d;
      margin-top: 60px;
      padding: 29px;
      box-sizing: border-box;
      border: 1px solid #0f3e73;

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 29px;
      }

      .title {
        color: $color-primary;
        font-size: 24px;
        font-weight: 400;
      }
    }
  }
}
</style>
