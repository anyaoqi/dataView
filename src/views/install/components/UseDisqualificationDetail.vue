<!-- E福通使用不合格明细 -->
<template>
  <div class="detail">
    <div class="">
      <ul class="table-heade">
        <li class="runk_num">序号</li>
        <li class="cust_name">零售户</li>
        <li class="department">所属客服部</li>
        <li class="score">建设分数</li>
        <li class="reason">不合格原因</li>
      </ul>
      <swiper v-if="showSwiper" :space-between="0" :modules="modules" direction="horizontal" observer observeParents
        :autoplay="autoPlayOption" class="detail-swiper" :scrollbar="{ draggable: false }"
        @transitionStart="transitionStart" @swiper="onSwiper">
        <swiper-slide v-for="(item, index) in totalPage" :key="index" class="item">
          <div class="detail-swiper-item" v-for="(item, index) in dataList" :key="index">
            <p class="rank-num" :class="{ 'bg-orange': item.sort < 4 }">
              {{ item.sort }}
            </p>
            <p class="cust_name">{{ item.cust_name }}</p>
            <p class="department">{{ item.department }}</p>
            <p class="score">{{ item.score }}</p>
            <p class="reason">{{ item.reason }}</p>
          </div>
        </swiper-slide>
      </swiper>

      <div class="pagination">
        <LeftOutlined @click="changePage('prev')" />
        <div class="pagination-icons">
          <i class="icon" v-show="index < 2 || index == page - 1 || index >= totalPage" v-for="(item, index) in totalPage"
            :key="index" :class="{ active: index == page - 1 }"></i>
        </div>
        <RightOutlined @click="changePage('next')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import installApi from '@/apis/apiInstall'
import { ref, reactive, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Scrollbar } from 'swiper'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
const changePageType = ref('next')
onMounted(() => {
  getUseDisqualificationDetailData()
})
const useSwiper = ref(null)
function onSwiper(swiper) {
  useSwiper.value = swiper
}

const showSwiper = ref(false)
const dataList = ref([]) // 数据
const page = ref(1)
const pageSize = 10
const totalPage = ref(0)
function getUseDisqualificationDetailData() {
  installApi
    .getUseDisqualificationDetailData({
      page: page.value,
      pageSize: pageSize,
    })
    .then((res) => {
      dataList.value = res.data.data
      if (dataList.value.length !== 0) {
        dataList.value.forEach((item) => {
          item.reason = item.reason.replace(/<[^>]+>/g, '')
        })
      }
      totalPage.value = Math.ceil(res.data.total / pageSize)
      showSwiper.value = true
    })
}

const autoPlayOption = reactive({
  delay: 5000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
  reverseDirection: false,
})

const modules = [Autoplay, Scrollbar]

// 开始切换
function transitionStart() {
  if (changePageType.value === 'next') {
    page.value++
    if (page.value >= totalPage.value) {
      page.value = 1
    }
  } else {
    if (page.value <= 1) {
      return
    }
    page.value--
  }

  changePageType.value = 'next'
  getUseDisqualificationDetailData()
}

function changePage(type) {
  changePageType.value = type
  if (type === 'prev') {
    if (page.value <= 1) {
      return
    }
    useSwiper.value.slidePrev()
  } else {
    if (page.value >= totalPage.value) {
      return
    }
    useSwiper.value.slideNext()
  }
  getUseDisqualificationDetailData()
}

function onSlideChange() {
  // console.log('slide change')
}
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #00d2ff;
  font-size: 18px;
  padding-left: 35px;

  &-swiper {
    width: 100%;
    flex: 1;

    &-item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 52px;
      padding: 0 21px;
      background: rgba($color: #0a51f9, $alpha: 0.05);
      border-radius: 4px;
      margin-bottom: 5px;

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
        // padding: 0 20px 0 14px;
        text-align: center;
      }

      .bg-orange {
        background: url(../../../assets/images/install/num_bg_orange.png) no-repeat;
      }
    }
  }

  .table-heade {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    justify-content: space-around;
    height: 52px;
    padding: 0 21px;
    background: rgba($color: #0a51f9, $alpha: 0.1);
    border-radius: 4px;
    margin-bottom: 5px;
    margin-top: 14px;
  }

  .cust_name {
    // width: 162px;
    flex: 1;
    padding-left: 35px;
    padding-right: 26px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .department {
    width: 127px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .score {
    width: 121.5px;
    min-width: 75px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .reason {
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pagination {
    display: flex;
    align-items: center;
    padding-top: 40.56px;
    justify-content: center;
    cursor: pointer;

    &-icons {
      display: flex;

      .icon {
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #24aac3;
        opacity: 0.3;
        // transition: all .3s;
        margin-right: 5px;
      }

      .active {
        width: 19px;
        height: 6px;
        border-radius: 3px 3px 3px 3px;
        background: linear-gradient(-270deg, #0e5f84, #00d2ff);
      }
    }
  }
}
</style>
