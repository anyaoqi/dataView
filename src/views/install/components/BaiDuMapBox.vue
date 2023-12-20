<template>
  <!-- <div class="map-cover"> -->
    <div class="" id="myEcharts" style="width: 100%; height: 100%; position: absolute"></div>

    <!-- <div class="cover-left"></div>
    <div class="cover-right"></div>
    <div class="cover-top"></div> -->
  <!-- </div> -->
</template>

<!-- <script src="http://api.map.baidu.com/api?v=3.0ak=FUrdgrcQFRa3n35Gaze3umY2UZZ6dl1i&callback=init"></script> -->
<script setup>
import styleJson from '@/mock/install/mapStyle.json'
import installApi from '@/apis/apiInstall'
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import geoJson from '@/assets/js/city.js'
import labelIcon from '@/assets/images/label-icon.png'
import 'echarts/extension/bmap/bmap'
console.log(styleJson)
echarts.registerMap('厦门', geoJson)
const chartRef = ref()

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
  chartRef.value.setOption(option.value)
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
    mapStyle: {
      styleJson: [
        {
          'featureType': 'land',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'color': '#091220ff'
          }
        },
        {
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'color': '#113549ff'
          }
        },
        {
          'featureType': 'green',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'color': '#0e1b30ff'
          }
        },
        {
          'featureType': 'building',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'building',
          'elementType': 'geometry.topfill',
          'stylers': {
            'color': '#113549ff'
          }
        },
        {
          'featureType': 'building',
          'elementType': 'geometry.sidefill',
          'stylers': {
            'color': '#143e56ff'
          }
        },
        {
          'featureType': 'building',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#dadada00'
          }
        },
        {
          'featureType': 'subwaystation',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'color': '#113549B2'
          }
        },
        {
          'featureType': 'education',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'medical',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'scenicspots',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'weight': 4
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#fed66900'
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'arterial',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'weight': 2
          }
        },
        {
          'featureType': 'arterial',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'arterial',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffeebb00'
          }
        },
        {
          'featureType': 'arterial',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'arterial',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'arterial',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'local',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'weight': 1
          }
        },
        {
          'featureType': 'local',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'local',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'local',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'local',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#979c9aff'
          }
        },
        {
          'featureType': 'local',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffffff'
          }
        },
        {
          'featureType': 'railway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'subway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off',
            'weight': 1
          }
        },
        {
          'featureType': 'subway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#d8d8d8ff'
          }
        },
        {
          'featureType': 'subway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'subway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'subway',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#979c9aff'
          }
        },
        {
          'featureType': 'subway',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffffff'
          }
        },
        {
          'featureType': 'continent',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'continent',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'continent',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'continent',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'city',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'city',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'city',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'city',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'town',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'town',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'town',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#454d50ff'
          }
        },
        {
          'featureType': 'town',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffffff'
          }
        },
        {
          'featureType': 'road',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'poilabel',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'districtlabel',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'road',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'road',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'road',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'district',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'poilabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'poilabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'poilabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'manmade',
          'elementType': 'geometry',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'districtlabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffffff'
          }
        },
        {
          'featureType': 'entertainment',
          'elementType': 'geometry',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'shopping',
          'elementType': 'geometry',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'nationalway',
          'stylers': {
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '6'
          }
        },
        {
          'featureType': 'nationalway',
          'stylers': {
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '7'
          }
        },
        {
          'featureType': 'nationalway',
          'stylers': {
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '8'
          }
        },
        {
          'featureType': 'nationalway',
          'stylers': {
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '9'
          }
        },
        {
          'featureType': 'nationalway',
          'stylers': {
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '10'
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '6'
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '7'
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '8'
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '9'
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '10'
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '6'
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '7'
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '8'
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '9'
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,10',
            'level': '10'
          }
        },
        {
          'featureType': 'cityhighway',
          'stylers': {
            'curZoomRegionId': '0',
            'curZoomRegion': '6,9',
            'level': '6'
          }
        },
        {
          'featureType': 'cityhighway',
          'stylers': {
            'curZoomRegionId': '0',
            'curZoomRegion': '6,9',
            'level': '7'
          }
        },
        {
          'featureType': 'cityhighway',
          'stylers': {
            'curZoomRegionId': '0',
            'curZoomRegion': '6,9',
            'level': '8'
          }
        },
        {
          'featureType': 'cityhighway',
          'stylers': {
            'curZoomRegionId': '0',
            'curZoomRegion': '6,9',
            'level': '9'
          }
        },
        {
          'featureType': 'cityhighway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,9',
            'level': '6'
          }
        },
        {
          'featureType': 'cityhighway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,9',
            'level': '7'
          }
        },
        {
          'featureType': 'cityhighway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,9',
            'level': '8'
          }
        },
        {
          'featureType': 'cityhighway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,9',
            'level': '9'
          }
        },
        {
          'featureType': 'cityhighway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,9',
            'level': '6'
          }
        },
        {
          'featureType': 'cityhighway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,9',
            'level': '7'
          }
        },
        {
          'featureType': 'cityhighway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,9',
            'level': '8'
          }
        },
        {
          'featureType': 'cityhighway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off',
            'curZoomRegionId': '0',
            'curZoomRegion': '6,9',
            'level': '9'
          }
        },
        {
          'featureType': 'subwaylabel',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'subwaylabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'tertiarywaysign',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'tertiarywaysign',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'provincialwaysign',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'provincialwaysign',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'nationalwaysign',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'nationalwaysign',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'highwaysign',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'highwaysign',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'village',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'district',
          'elementType': 'labels.text',
          'stylers': {
            'fontsize': 20
          }
        },
        {
          'featureType': 'district',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'district',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'country',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'country',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'water',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'water',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'cityhighway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'cityhighway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'tertiaryway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'tertiaryway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffff10'
          }
        },
        {
          'featureType': 'provincialway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'provincialway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'labels.text',
          'stylers': {
            'fontsize': 20
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'nationalway',
          'elementType': 'labels.text',
          'stylers': {
            'fontsize': 20
          }
        },
        {
          'featureType': 'provincialway',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'provincialway',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'provincialway',
          'elementType': 'labels.text',
          'stylers': {
            'fontsize': 20
          }
        },
        {
          'featureType': 'cityhighway',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'cityhighway',
          'elementType': 'labels.text',
          'stylers': {
            'fontsize': 20
          }
        },
        {
          'featureType': 'cityhighway',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'estate',
          'elementType': 'geometry',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'tertiaryway',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'tertiaryway',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'fourlevelway',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'fourlevelway',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'scenicspotsway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'scenicspotsway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'universityway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'universityway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'vacationway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'vacationway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'fourlevelway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'fourlevelway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#12223dff'
          }
        },
        {
          'featureType': 'fourlevelway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'transportationlabel',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'transportationlabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'transportationlabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'transportationlabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'educationlabel',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'educationlabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'educationlabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'educationlabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'transportation',
          'elementType': 'geometry',
          'stylers': {
            'color': '#113549ff'
          }
        },
        {
          'featureType': 'airportlabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'airportlabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'scenicspotslabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'scenicspotslabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'medicallabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'medicallabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'medicallabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'scenicspotslabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'airportlabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'entertainmentlabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'entertainmentlabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'entertainmentlabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'estatelabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'estatelabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'estatelabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'businesstowerlabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'businesstowerlabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'businesstowerlabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'companylabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'companylabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'companylabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'governmentlabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'governmentlabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'governmentlabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'restaurantlabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'restaurantlabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'restaurantlabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'hotellabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'hotellabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'hotellabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'shoppinglabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'shoppinglabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'shoppinglabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'lifeservicelabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'lifeservicelabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'lifeservicelabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'carservicelabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'carservicelabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'carservicelabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'financelabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'financelabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'financelabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'otherlabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'otherlabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'otherlabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'manmade',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'manmade',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'transportation',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'transportation',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'education',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'education',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'medical',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'medical',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        },
        {
          'featureType': 'scenicspots',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2dc4bbff'
          }
        },
        {
          'featureType': 'scenicspots',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        }
      ]
    }
  },
  series: series.value,
})

onMounted(() => {
  getCustomerCoordinatesData()
  getDepartCoordinatesData()
  setTimeout(() => {
    console.log('1')
    chartRef.value = echarts.init(document.getElementById('myEcharts'))

    console.log('2')
    // option.value.bmap.mapStyle.styleJson = styleJson
    if (chartRef.value === null){
      console.log('5')
    }
    chartRef.value.setOption(option.value)
    console.log('3')
    // var bmap = chartRef.value.getModel().getComponent("bmap").getBMap();
    // bmap.setMapStyle({ styleJson: styleJson, });

    chartRef.value.on('click', function(params) {
      console.log('4')
      getCustomer(params)
    })
  }, 1000)
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
