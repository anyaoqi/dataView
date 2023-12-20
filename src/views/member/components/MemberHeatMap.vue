<template>
  <div class="map-cover">
    <v-chart ref="chartRef" class="chart charts" :option="option" autoresize />
    <div class="cover-left"></div>
    <div class="cover-right"></div>
    <div class="cover-top"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
// import mapArray from './mapData.json'
import * as echarts from 'echarts/index.blank'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/chart/map'
import xiaMenMapData from '@/assets/map/xiamen.json'
import labelIcon from '@/assets/images/label-icon.png'
import { getRetailMember } from '@/apis/apiMember'

const dataJson = {
  '思明区': {
    name: '思明区局',
    value: '2430',
  },
  '集美区': {
    name: '集美区局',
    value: '8381',
  },
  '湖里区': {
    name: '湖里区局',
    value: '3805',
  },
  '同安区': {
    name: '第一分局',
    value: '9837',
  },
}

echarts.registerMap('Map', xiaMenMapData)
const option = ref({
  tooltip: {
    trigger: 'item',
  },
  title: {
    show: false,
  },
  toolbox: {
    feature: {
      restore: {
        show: false,
      },
      dataView: {
        show: false,
      },
      saveAsImage: {
        name: '热力图',
      },
      dataZoom: {
        show: false,
      },
      magicType: {
        show: false,
      },
    },
    iconStyle: {
      normal: {
        borderColor: '#1990DA',
      },
    },
    top: 15,
    right: 35,
  },
  visualMap: [
    {
      show: true,
      left: '2%',
      bottom: '1%',
      min: 0,
      max: 6000,
      text: ['40', '0'],
      calculable: true,
      seriesIndex: [0],
      inRange: {
        color: ['#41A7DE', '#eac736', '#fffc00', '#ff2600'],
      },
    },
    {
      show: true,
      left: '2%',
      bottom: '1%',
      min: 0,
      max: 6000,
      text: ['40', '0'],
      calculable: true,
      seriesIndex: [1],
      inRange: {
        color: 'rgba(0,0,0,0.1)',
      },
    },
  ],
  geo: {
    show: true,
    map: 'Map', //使用
    roam: false, // 不可拖动
    itemStyle: {
      normal: {
        show: false,
        areaColor: 'rgba(0, 127, 253, 0.1)',
        borderColor: '#00D2FF',
        borderWidth: '3',
        shadowColor: 'rgb(10,76,139)',
        shadowOffsetX: 5,
        shadowOffsetY: 3,
        shadowBlur: 65,
      },
      //emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
      emphasis: {
        show: false,
        areaColor: '#8dd7fc',
      },
    },
    label: {
      show: false,
      fontSize: 26,
      color: '#fff',
      formatter: (obj) => {
        const data = dataJson[obj.name]
        return data ? `{img|}{text| ${data.name}}  {num|${data.value}户}` : ''
      },
      height: 50,
      borderWidth: 2,
      borderColor: 'rgba(35, 240, 255, 0.4)',
      verticalAlign: 'center',
      align: 'left',
      padding: [0, 18, 0, 5],
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      rich: {
        img: {
          height: 50,
          align: 'left',
          backgroundColor: {
            image: labelIcon,
          },
        },
        text: {
          fontSize: 24,
          color: '#fff',
          align: 'left',
        },
        num: {
          fontSize: 24,
          color: '#23F0FF',
        },
      },
      emphasis: { show: false },
      normal: {
        show: false,
        color: 'rgb(249, 249, 249)', //省份标签字体颜色
      },
    },
    zoom: 1,
    left: 'center',
    top: 50,
  },
  series: [
    {
      name: '地图',
      type: 'heatmap',
      data: [],
      coordinateSystem: 'geo',
      pointSize: 50, //修改热力图点的半径
      blurSize: 50, //阴影的大小
    },
    {
      name: '散点图',
      type: 'scatter',
      data: [],
      coordinateSystem: 'geo',
      label: {
        show: true,
        formatter: function (param) {
          return `${param.name}\n${param.value[2]}`
        },
        position: 'inside',
        color: '#fff',
        fontSize: 18,
      },
      labelLine: {
        lineStyle: {
          color: 'red',
        },
      },
      symbol: 'pin',
      itemStyle: {
        normal: {
          color: '#F4E925',
          shadowBlur: 10,
          shadowColor: '#333',
          borderColor: '#00d2ff',
          borderWidth: 2,
        },
      },
      symbolSize: function (data) {
        let size = data[2] / 50
        if (size < 50) {
          size = 50
        }
        if (size > 200) {
          size = 200
        }
        return [size + 20, size + 20]
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function (param) {
            return `${param.name}\n${param.value[2]}`
          },
          position: 'inside',
          color: '#fff',
          fontSize: 24,
        },
      },
    },
  ],
})

const chartRef = ref()
getRetailMember().then(({ data }) => {
  chartRef.value.setOption({
    series: [
      {
        data: data.araeMemeber,
      },
      {
        data: data.retailAreaData,
      },
    ],
  })
})
</script>

<style lang="scss">
.map-cover {
  margin: -200px -200px 0 -200px;
  width: calc(100% + 400px);
  height: 100%;
  position: relative;
}
.cover-left {
  position: absolute;
  min-width: 200px;
  height: 100%;
  margin-left: -5px;
  background: linear-gradient(to right, #020b1bff, #00000000);
}

.cover-right {
  position: absolute;
  min-width: 200px;
  height: 100%;
  right: 0;
  margin-right: -5px;
  background: linear-gradient(to left, #020b1bff, #ffffff00);
}

.cover-top {
  position: absolute;
  width: 100%;
  min-height: 200px;
  margin-top: -5px;
  background: linear-gradient(to bottom, #020b1bff, #00000000);
}

.charts {
  position: absolute;
}
</style>
