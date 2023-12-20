<!-- 最新活动统计 -->
<template>
  <WrapperTitle title="最新活动统计" />

  <div class="statistics">
    <!-- 左侧一块 -->
    <div class="statistics-left">
      <div class="statistics-left-item">
        <p class="title">发放积分(分)</p>
        <div class="numbers">
          <p class="numbers-item" v-for="(item, index) in '5041865'" :key="index">
            {{ item }}
          </p>
        </div>
      </div>
      <div class="statistics-left-item">
        <p class="title">订单总量(笔)</p>
        <div class="numbers">
          <p class="numbers-item" v-for="(item, index) in '81549'" :key="index">
            {{ item }}
          </p>
        </div>
      </div>
    </div>

    <!-- 右侧两块 地图-实时积分 -->
    <div class="statistics-right">
      <!-- 地图 -->
      <div class="statistics-right-map" id="mapEchart" style="width: 662px; height: 753px"></div>
      <!-- 实时积分 -->
      <div class="statistics-right-point">
        <p class="title">实时积分{{ dataList.length }}</p>
        <swiper :slides-per-view="5" :space-between="12" :modules="modules" direction="vertical" :loop="false"
          :autoplay="autoplayOptionsPoint" class="statistics-right-points-swiper" :scrollbar="{ draggable: false }"
          @reachEnd="transitionEnd">
          <swiper-slide v-for="(item, index) in dataList" :key="index" class="item">
            <div>
              <p class="point_date">{{ item.point_date }}</p>
              <p class="nickname">{{ item.nickname }}</p>
            </div>
            <p class="departmant_name">{{ item.departmant_name }}</p>
            <p class="point">{{ item.point }}</p>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import integralApi from '@/apis/apiIntegral'
import { ref, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import geoJson from '@/assets/js/city.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Scrollbar } from 'swiper'
import labelIcon from '@/assets/images/label-icon.png'

echarts.registerMap('厦门', geoJson)
const chartRef = ref()
onMounted(() => {
  chartRef.value = echarts.init(document.getElementById('mapEchart'))
  chartRef.value?.setOption(option)
  getRealTimePoint()
})

const series = [
  {
    type: 'effectScatter', //effectScatter 特效散点图
    symbol: labelIcon,
    coordinateSystem: 'geo',
    rippleEffect: {
      period: 0, //动画时间，值越小速度越快
      brushType: 'fill', //波纹绘制方式 stroke, fill
      scale: 0, //波纹圆环最大限制，值越大波纹越大 4
    },
    itemStyle: {
      color: 'transparent',
    },
    data: [
      {
        name: '思明',
        value: [118.11794, 24.483749],
        count: '518.808',
        orders: '3064.9',
      },
      {
        name: '湖里',
        value: [118.14854 , 24.55498],
        count: '871.738',
        orders: '3,398.30',
      },
      {
        name: '集美',
        value: [118.052591, 24.564227],
        count: '1,373.908',
        orders: '6,257.80',
      },
      {
        name: '第一分局',
        value: [118.148151, 24.735052],
        count: '2,276.906',
        orders: '8,235.80',
      },
    ],
    tooltip: {
      trigger: 'item',
      show: true,
      position: 'right',
      // borderColor: '#ffffff00' ,
      // backgroundColor: '#ffffff00',
      formatter: (params) => {
        return `<div style="color: #fff;">
                    <div><span style="color: #00D2FF;margin-right: 10px;" >积分总额:</span>${params.data.count}</div>
                    <div><span style="color: #00D2FF; margin-right: 10px;" >订单总量:</span>${params.data.orders}</div>
                </div>`
      },

    },
    label: {
      formatter: (params) => {
        const arr = [`{title|}${params.name}`, `{orders|${params.data.orders}}`]
        return arr.join('\n')
      },
      position: 'bottom',
      color: '#fff',
      show: true,
      fontSize: 18,
      rich: {
        title: {
          height: 30,
          backgroundColor: {
            image: labelIcon,
          },
        },
        orders: {
          // fontSize: 20,
          padding: [5, 30],
          fontSize: 18,
        },
      },
    },
    // layoutCenter: ['100%', '100%'],
    layoutSize: '100%',
    position: ['0%', '50%']
  },
  // {
  //   type: 'effectScatter', //effectScatter 特效散点图
  //   symbol: labelIcon,
  //   coordinateSystem: 'geo',
  //   rippleEffect: {
  //     period: 0, //动画时间，值越小速度越快
  //     brushType: 'fill', //波纹绘制方式 stroke, fill
  //     scale: 0, //波纹圆环最大限制，值越大波纹越大 4
  //   },
  //   itemStyle: {
  //     color: 'transparent',
  //   },
  //   data: [
  //     {
  //       name: '思明',
  //       value: [118.12332 , 24.46091],
  //       count: '518.808',
  //       orders: '3064.9',
  //     },
  //     {
  //       name: '湖里',
  //       value: [118.11024 , 24.51056 ],
  //       count: '871.738',
  //       orders: '3,398.30',
  //     },
  //     {
  //       name: '集美',
  //       value: [118.01001 , 24.64702],
  //       count: '1,373.908',
  //       orders: '6,257.80',
  //     },
  //     {
  //       name: '海沧',
  //       value: [117.99547 , 24.51311],
  //       count: '',
  //       orders: '',
  //     },,
  //     {
  //       name: '同安',
  //       value: [118.10508 , 24.83244 ],
  //       count: '2,276.906',
  //       orders: '8,235.80',
  //     },,
  //     {
  //       name: '翔安',
  //       value: [118.242811, 24.637479],
  //       count: '',
  //       orders: '',
  //     },
  //   ],
  //   tooltip: {
  //     trigger: 'item',
  //     show: false,

  //   },
  //   label: {
  //     formatter: (params) => {
  //       console.log(params);
  //       const arr = [params.name, `{orders|${params.data.orders}}`]
  //       return arr.join('\n')
  //     },
  //     position: 'bottom',
  //     color: '#00D2FF',
  //     show: true,
  //     fontSize: 22,
  //     rich: {
  //       orders: {
  //         padding: [2, 0],
  //         fontSize: 22,
  //       }
  //     },
  //   },
  //   // layoutCenter: ['100%', '100%'],
  //   layoutSize: '100%',
  //   position: ['0%', '50%']
  // },
]

const option = {
  grid: {
    // 让图表占满容器
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
  },
  tooltip: {
    show: false,
  },
  geo: {
    map: '厦门',
    type: 'map',
    roam: false,
    label: {
      show: false,
      textStyle: {
        color: '#00D2FF',
        fontSize: 18,
      },
    },
    tooltip: {
      show: false,
      //设置鼠标移至城市板块选中视图配置选项
      backgroundColor: ' rgba(3,21,42,0.80)', //设置地图高亮时城市视图背景色框
      borderRadius: 0,
      trigger: 'item',
      formatter: () => {
        return ''
      },
    },
    emphasis: {
      label: {
        show: false,
      }
    },
    itemStyle: {
      //设置地图板块配置选项
      areaColor: 'rgba(255, 255, 255, 0.125)',
      normal: {
        // 图形的描边颜色
        // borderColor: '#55aaff',
        borderColor: '#38C8FB',
        // 描边线宽。
        borderWidth: 1,
        // 柱条的描边类型。
        borderType: 'solid',
        areaColor: 'rgba(26, 66, 184, 0.125)',
        label: {
          // 显示省份下面市、州的名称
          show: false,
          textStyle: {
            color: '#fff',
            fontSize: 22,
            fontWeight: 400,
          },
        },
      },
      // 鼠标放上去后，样式改变
      emphasis: {
        // 图形的描边颜色
        borderColor: '#00FEEC',
        borderWidth: '2',
        // 阴影色
        areaColor: new echarts.graphic.RadialGradient(
          0.5,
          0.5,
          0.8,
          [
            {
              offset: 0,
              color: 'rgba(26, 66, 184, 0.125)',
            },
            {
              offset: 0.7,
              color: 'rgba(26, 66, 184, 0.25)',
            },
            {
              offset: 1,
              color: 'rgba(26, 66, 184, 0.35)',
            },
          ],
        ),
      },
    },
  },
  series: series,
}

// 实施积分滚动配置
const autoplayOptionsPoint = reactive({
  delay: 1000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
  reverseDirection: false,
})
const modules = [Autoplay, Scrollbar]
const dataList = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 10
// 获取实施积分数据
function getRealTimePoint() {
  integralApi
    .getRealTimePoint({
      page: page.value,
      pageSize: pageSize,
    })
    .then((res) => {
      dataList.value = dataList.value.concat(res.data.data)
      dataList.value.forEach((element) => {
        element.point_date = element.point_date.slice(5, 16)
        element.departmant_name = element.departmant_name.slice(0, 2) + '区'
      })

      total.value = res.data.total
    })
}
// 实施积分滚动到最后一条时, 自动获取下一页数据
function transitionEnd() {
  page.value++
  getRealTimePoint()
}
</script>

<style lang="scss" scoped>
.statistics {
  color: #fff;
  height: 100%;
  display: flex;

  &-left-item {
    font-size: 56px;
    padding-top: 46px;
    padding-bottom: 14px;
    font-weight: bold;

    .title {
      color: $color-primary;
      font-size: 24px;
      padding-bottom: 18px;
    }

    .numbers {
      display: flex;

      &-item {
        width: 56px;
        height: 80px;
        background: url(../../../assets/images/num-bg.png);
        text-align: center;
        line-height: 80px;
        margin-right: 8px;
      }
    }
  }

  &-right {
    flex: 1;
    display: flex;

    &-point {
      font-size: 26px;
      flex: 1;

      .title {
        text-align: right;
        font-weight: 500;
        padding-bottom: 19px;
      }
    }

    &-points-swiper {
      // width: 398px;
      width: 100%;
      height: 488px;
      color: $color-primary;

      .item {
        width: 100%;
        height: 88px;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-weight: 500;
        background: linear-gradient(89deg,
            rgba($color: #0c1b48, $alpha: 0.2),
            rgba($color: #007ffd, $alpha: 0.2));
        border-radius: 4px;

        .point_date {
          font-size: 18px;
          font-weight: 400;
          padding-bottom: 10px;
        }

        .nickname {
          width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .departmant_name {
          color: #fff;
        }

        .point {
          font-size: 28px;
          color: #ff9444;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
