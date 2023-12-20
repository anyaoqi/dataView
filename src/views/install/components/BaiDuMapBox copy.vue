<template>
  <div class="map-cover">
    <div class="" id="myEcharts" style="width: 100%; height: 100%; position: absolute"></div>

    <!-- <div class="cover-left"></div>
    <div class="cover-right"></div>
    <div class="cover-top"></div> -->
  </div>
</template>

<!-- <script src="http://api.map.baidu.com/api?v=3.0ak=FUrdgrcQFRa3n35Gaze3umY2UZZ6dl1i&callback=init"></script> -->
<script setup>
import styleJson from './style.json'
import installApi from '@/apis/apiInstall'
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import geoJson from '@/assets/js/city.js'
import labelIcon from '@/assets/images/label-icon.png'
import 'echarts/extension/bmap/bmap'
console.log(styleJson)
echarts.registerMap('厦门', geoJson)
const chartRef = ref()
onMounted(() => {
  getCustomerCoordinatesData()
  getDepartCoordinatesData()
  setTimeout(() => {
    chartRef.value = echarts.init(document.getElementById('myEcharts'))
    option.value.bmap.mapStyle.styleJson = styleJson
    chartRef.value?.setOption(option.value)
    const bmap = chartRef.value.getModel().getComponent('bmap').getBMap()
    bmap.setMapStyle({ styleJson: styleJson })
    chartRef.value.on('click', function(params) {
      getCustomer(params)
    })
  }, 1000)
})

// 获取零售户经纬度
const custList = ref([])
const custPointList = ref([])
function getCustomerCoordinatesData() {
  installApi.getCustomerCoordinatesData().then((res) => {
    res.data.data.forEach((item) => {
      const obj = {
        name: item.cust_name,
        value: [item.lng, item.lat],
        depart_code: item.depart_code

      }
      if (item.lng && item.lat) {
        custList.value.push(obj)
      }
    })
  })
}

// 点击获取零售户分布散点
function getCustomer(params) {
  console.log(params)
  const data = []
  custList.value.map (item => {
    console.log(item)
    if (item.depart_code === params.data.depart_code) {
      data.push(item)
    }
  })
  custPointList.value = data
  series.value[1].data = custPointList.value
  option.value.bmap.zoom = 15
  option.value.bmap.center = [params.data.value[0], params.data.value[1]]
  chartRef.value?.setOption(option.value)
}

// 获取客服部经纬度和e福通客户数
const departList = ref([])
function getDepartCoordinatesData() {
  installApi.getDepartCoordinatesData().then((res) => {
    // departList.value = res.data.data;
    const data = res.data.data
    data.forEach((item) => {
      const obj = {
        name: item.depart_name,
        value: [item.lng, item.lat, item.e_cust_total],
        depart_code: item.depart_code
      }
      if (item.lng && item.lat) {
        departList.value.push(obj)
      }
    })
  })
}

const series = ref([
  {
    tooltip: {
      backgroundColor: '', //这里设置鼠标移至城市板块后提示视图透明
      borderWidth: 0,
      tooltip: {
        show: false,
        trigger: 'item',
        showDelay: 0,
        hideDelay: 0,
        enterable: true, //鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true
        transitionDuration: 0, //提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动
        extraCssText: 'z-index:999;', //修改标签大小样式等
      },
    },
    type: 'effectScatter', //effectScatter 特效散点图
    // coordinateSystem: 'geo',
    coordinateSystem: 'bmap',//坐标系必须为bmap
    rippleEffect: {
      period: 4, //动画时间，值越小速度越快
      brushType: 'stroke', //波纹绘制方式 stroke, fill
      scale: 4, //波纹圆环最大限制，值越大波纹越大 4
    },
    itemStyle: {
      color: 'transparent',
    },
    data: departList.value,
    layoutCenter: ['100%', '100%'],
    label: {
      show: true,
      position: ['50%', '50%'],
      fontSize: 20,
      // padding: [10, 20],
      color: '#fff',
      backgroundColor: 'rgba(26, 57, 97, 0.5)',
      borderColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
        {
          offset: 0,
          color: '#01FEBF',
        },
        {
          offset: 1,
          color: '#00FFFC',
        },
      ]),
      borderWidth: 1,
      borderRadius: 6,
      formatter(params) {
        const arr = [`{title|}${params.name}{sum|${params.value[2]}户}`]
        return arr.join('\n')
      },

      rich: {
        title: {
          height: 84,
          backgroundColor: {
            image: labelIcon,
          },
        },
        sum: {
          fontSize: 20,
          color: '#00D2FF',
          padding: [0, 20],
        },
      },
    },
  },
  {
    type: 'scatter', //effectScatter 特效散点图
    // coordinateSystem: 'geo',
    coordinateSystem: 'bmap',//坐标系必须为bmap
    itemStyle: {
      color: '#00FEF7',
    },
    data: custPointList.value,
    large: true,
    tooltip: {

      textStyle: {
        color: '#fff',
        fontSize: 20,
      },
    },
  },
])

const option = ref({
  tooltip: {
    show: false,
    trigger: 'item',
    showDelay: 0,
    hideDelay: 0,
    enterable: true, //鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true
    transitionDuration: 0, //提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动
    extraCssText: 'z-index:100;', //修改标签大小样式等
  },
  bmap: {
    center: [118.09643, 24.48541],
    zoom: 12,
    roam: true,
    key: 'FUrdgrcQFRa3n35Gaze3umY2UZZ6dl1i',
    mapStyle: {
      styleJson: styleJson
    }
  },
  series: series.value,
})
</script>

<style lang="scss" scoped>
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
</style>
