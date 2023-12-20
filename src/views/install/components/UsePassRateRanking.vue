<!-- 使用合格率排名 -->
<template>
  <div class="rate-ranking">
    <!-- <p class="title">按照客户经理排名，零售客户档位评分4分以上为合格</p> -->
    <swiper :slides-per-view="5" :space-between="8" :modules="modules" direction="vertical" :loop="false"
      :autoplay="autoplayOptionsRateRanking" class="rate-ranking-swiper" :scrollbar="{ draggable: false }"
      @reachEnd="transitionEnd" v-if="showSwiper">
      <swiper-slide v-for="(item, index) in dataList" :key="index" class="item">
        <p class="rank-num">{{ index + 1 }}</p>
        <p class="customer_manager">{{ item.customer_manager }}</p>
        <p class="department_name">{{ item.department_name }}</p>

        <div class="progress">
          <a-progress :stroke-color="{
            from: '#00FF7E',
            to: '#3DBA95',
          }" :percent="item.e_use_pass_rate" trailColor="rgba(10, 81, 249, 0.125)" strokeLinecap="square"
            :showInfo="false" />
        </div>
        <p class="rate">{{ item.e_use_pass_rate }}%</p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import installApi from '@/apis/apiInstall'
import { ref, reactive, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Scrollbar } from 'swiper'
const autoplayOptionsRateRanking = reactive({
  delay: 1000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true
})
const modules = [Autoplay, Scrollbar]
const showSwiper = ref(false)
const dataList = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 10
// 获取实施积分数据
function getUsePassRateRanking() {
  installApi
    .getUsePassRateRanking({
      page: page.value,
      pageSize: pageSize,
    })
    .then((res) => {
      dataList.value = dataList.value.concat(res.data.data)
      dataList.value.forEach((element) => {
        element.department_name = element.department_name.slice(0, 2) + '区局'
        element.e_use_pass_rate = Number(element.e_use_pass_rate)
      })

      total.value = res.data.total
      showSwiper.value = true

    })
}

onMounted(() => {
  getUsePassRateRanking()
})

function transitionEnd() {
  page.value++
  getUsePassRateRanking()
}
</script>

<style lang="scss" scoped>
.rate-ranking {
  width: 100%;
  height: 100%;
  font-size: 20px;
  white-space: nowrap;
  padding: 15px 42px 26px;
  color: #fff;

  .title {
    padding-bottom: 26px;
    font-size: 18.42px;
  }

  .swiper {
    width: 100%;
    height: 100%;

    .item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 27px 0 16px;
      background: rgba($color: #ffff, $alpha: 0.05);
      border-radius: 4px;

      .rank-num {
        width: 44px;
        min-width: 44px;
        height: 26px;
        line-height: 26px;
        position: relative;
        background: url(../../../assets/images/install/num_bg_blue.png) no-repeat;
        background-size: 100% 100%;
        border-radius: 4px 4px 4px 4px;
        color: #111927;
        font-size: 18px;
        padding: 0 20px 0 14px;
      }

      .progress {
        flex: 1;
        margin-right: 22px;
        margin-left: 20px;
      }

      .customer_manager {
        width: 105.5px;
      }

      .department_name {
        width: 118px;
        color: $color-primary;
      }

      .customer_manager,
      .department_name {
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .rate {
        width: 68px;
      }
    }
  }
}

::v-deep .ant-progress.ant-progress-line.ant-progress-status-normal.ant-progress-show-info.ant-progress-small {
  margin-bottom: 0 !important;
}
</style>
