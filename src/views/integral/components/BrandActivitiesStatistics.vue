<!-- 品牌活动统计 -->
<template>
  <div class="statistics">
    <div class="statistics-extend">
      <p class="title">客服部推广排名</p>
      <ul class="statistics-extend-header">
        <!-- <li></li> -->
        <li class="department_name">客服部</li>
        <li class="point">发放积分</li>
        <li>核销进度</li>
      </ul>
      <ul class="statistics-extend-body">
        <!-- 客服部推广排名 -->
        <li class="statistics-extend-body-item" v-for="(item, index) in departmentRankingDataList" :key="index">
          <p class="rank-num">{{ index + 1 }}</p>
          <p class="department_name">{{ item.department_name }}</p>
          <p class="point">{{ item.release_point }}万</p>

          <a-progress :stroke-color="{
            from: '#00FF83',
            to: '#03DE9E',
          }" :percent="item.process" trailColor="rgba(10, 81, 249, 0.125)" />
          <p>{{ item.process }}%</p>
        </li>
      </ul>
    </div>

    <!-- 会员累计积分排名 -->
    <div class="statistics-points">
      <div class="title-box">
        <p class="title">会员累计积分排名</p>
        <div class="pagination">
          <LeftOutlined />
          <p class="num">
            <span style="color: #fff">{{ pointPage }}</span>/{{ totalPage }}
          </p>
          <RightOutlined />
        </div>
      </div>
      <swiper class="statistics-points-swiper-horizontal" :autoplay="autoplayOptionsHorizontalPoint" :modules="modules"
        :scrollbar="{ draggable: false }" :loop="false" @transitionStart="transitionStartHorizontal"
        :allowTouchMove="false">
        <swiper-slide style="height: 100%" v-for="(item, index) in totalPage" :key="index">
          <!-- <swiper :slides-per-view="7" :space-between="0" :modules="modules" direction="vertical" :loop="false"
                        :autoplay="autoplayOptionsVerticalPoint" class="statistics-points-swiper-vertical"
                        :scrollbar="{ draggable: false }">
                        <swiper-slide v-for="(subItem, subIndex) in brandActivitiesRankingDataList" :key="subIndex" class="item">

                        </swiper-slide>
                    </swiper> -->
          <div class="item" v-for="(subItem, subIndex) in brandActivitiesRankingDataList" :key="subIndex">
            <p class="rank-num" :class="{ 'orange-bg': subIndex < 3 }">
              {{ subItem.sort }}
            </p>
            <p class="info name">{{ subItem.nickname }}</p>
            <p class="info tel">{{ subItem.mobile }}</p>
            <p class="info point">{{ subItem.point }}分</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import integralApi from '@/apis/apiIntegral'
import { ref, reactive, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Scrollbar } from 'swiper'
import 'swiper/css'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'

onMounted(() => {
  getDepartmentRanking()
  getBrandActivitiesRanking()
})

const swiperHorizontalPointDelay = ref(6000)

// 获取客服部推广排名
const departmentRankingDataList = ref([])
function getDepartmentRanking() {
  integralApi
    .getDepartmentRanking({
      page: 1,
      pageSize: 10,
    })
    .then((res) => {
      departmentRankingDataList.value = res.data
      departmentRankingDataList.value.forEach((item) => {
        const process =
          (Number(item.check_point) / Number(item.release_point)) * 100
        item.process = Number(process.toFixed(2))
        item.department_name = item.department_name.slice(0, 2) + '区'
        item.release_point = (Number(item.release_point) / 10000).toFixed(2)
      })
    })
}

// 获取累计积分排名
const brandActivitiesRankingDataList = ref([])
const pointPage = ref(1)
const pointPageSize = ref(7)
const totalPage = ref(0)
function getBrandActivitiesRanking() {
  integralApi
    .getBrandActivitiesRanking({
      page: pointPage.value,
      pageSize: pointPageSize.value,
    })
    .then((res) => {
      const data = res.data.data
      data.forEach((item) => {
        item.mobile = phoneFormatting(item.mobile)
      })
      brandActivitiesRankingDataList.value = data

      totalPage.value = Math.ceil(res.data.total / pointPageSize.value)
      swiperHorizontalPointDelay.value =
        (brandActivitiesRankingDataList.value.length - 7) * 2500
    })
}

function phoneFormatting(val) {
  if (val) {
    let str = val + ''
    str = str.substr(0, 3) + '****' + str.substr(7)
    return str
  } else {
    return '暂无'
  }
}

// 会员累计积分排名 --  横向滚动配置
const autoplayOptionsHorizontalPoint = reactive({
  delay: 5000,
  // disableOnInteraction: false,
  // pauseOnMouseEnter: true,
  // reverseDirection: false,
  autoplay: false,
})
//自动轮播的配置 -- 客服部推广排名

// 会员累计积分排名 --  垂直滚动配置
// const autoplayOptionsVerticalPoint = reactive({
//   delay: 2000,
//   disableOnInteraction: false,
//   pauseOnMouseEnter: true,
//   reverseDirection: false
// })

const modules = [Autoplay, Scrollbar]

function transitionStartHorizontal() {
  // console.log(e);
  pointPage.value++
  if (pointPage.value > totalPage.value) {
    pointPage.value = 1
  }
  getBrandActivitiesRanking()
}
</script>
<style lang="scss" scoped>
.statistics {
  color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;

  .rank-num {
    // width: 26px;
    min-width: 26px;
    height: 26px;
    font-size: 18px;
    color: #0e1114;
    text-align: center;
    line-height: 26px;
    background: linear-gradient(0deg, #12d3ff, #a2efff);
    border-radius: 4px 4px 4px 4px;
    font-weight: 700;
  }

  .title {
    font-size: 26px;
  }

  &-extend {
    width: 100%;
    padding-top: 30px;

    &-header {
      font-size: 20px;
      display: flex;
      background: linear-gradient(-90deg,
          rgba($color: #0c1b48, $alpha: 0.1),
          rgba($color: #007ffd, $alpha: 0.1));
      height: 36px;
      color: $color-primary;
      align-items: center;
      justify-content: space-around;
      margin: 21px 0;
      border-radius: 4px 4px 4px 4px;

      li:nth-child(1) {
        padding-right: 48px;
        padding-left: 46px;
      }

      li:nth-child(3) {
        flex: 1;
        text-align: right;
      }
    }

    &-body {
      width: 100%;

      &-item {
        display: flex;
        white-space: nowrap;
        align-items: center;
        margin-bottom: 40px;
        font-size: 24px;

        .department_name {
          padding: 0 20px;
        }

        .point {
          padding: 0 46px 0 17px;
          min-width: 183px;
        }
      }
    }
  }

  &-points {
    flex: 1;

    &-swiper-horizontal {
      width: 100%;
      height: 583px;
      border: 1px solid rgba($color: #016198, $alpha: 0.8);
      border-radius: 8px 8px 8px 8px;
    }

    &-swiper-vertical {
      width: 100%;
      height: 100%;
    }

    .item {
      height: 84px !important;
      display: flex;
      font-size: 24px;
      justify-content: space-around;
      align-items: center;
      border-bottom: 1px dotted rgba($color: #016198, $alpha: 0.8);
      color: $color-primary;

      .info {
        height: 100%;
        display: flex;
        align-items: center;
      }

      .name {
        padding: 0 44.5px 0 33px;
        border-right: 1px dotted rgba($color: #016198, $alpha: 0.8);
        border-left: 1px dotted rgba($color: #016198, $alpha: 0.8);
      }

      .tel {
        padding: 0 69px 0 44.5px;
        border-right: 1px dotted rgba($color: #016198, $alpha: 0.8);
      }

      .point {
        padding-left: 69px;
        flex: 1;
        color: #ff9444;
      }

      .rank-num {
        margin: 0 33px 0 31px;
      }

      .rank-num.orange-bg {
        background: linear-gradient(0deg, #ff9544, #fbe26c);
      }
    }

    .title-box {
      padding-bottom: 30px;
      display: flex;
      justify-content: space-between;

      .pagination {
        display: flex;
        align-items: center;
        color: $color-primary;
        font-size: 24px;
        font-weight: 700;
        cursor: pointer;

        .num {
          padding: 0 25px;
        }
      }
    }
  }
}
</style>
