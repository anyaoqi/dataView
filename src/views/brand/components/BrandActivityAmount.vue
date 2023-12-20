<script setup>
import { ref, reactive, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import BrandModalContent from './BrandModalContent.vue'
import {getActivityAmountData} from '@/apis/apiBrand'

// 订单预测模型弹框
const modal = reactive({
  open: false,
  wrapClassName: 'custom-modal',
  bodyStyle: {},
  width: '1080px',
})
const data = ref({})
const amount = ref([])

onMounted(() => {
  modal.getContainer = document.getElementById('#brand')
})

// const handleOk = () => {
//   console.log('ok')
// }

const openModal = () => {
  modal.open = true
}
const closeModal = () => {
  modal.open = false
}

const getAmountArray = (numberString) => {
  const numberArray = []
  let count = 0
  for (let i = numberString.length -1; i >=0 ; i--) {
    if (count !== 0 && count % 3 === 0) {
      numberArray.unshift(',')
    }
    numberArray.unshift(numberString.charAt(i))
    count++
  }
  return numberArray
}

const getData = async () => {
  const result = await getActivityAmountData()
  data.value = result.data.data
  amount.value = getAmountArray(data.value.amount.toString())
}

getData()

const modalContainer = ref()
onClickOutside(modalContainer, (event) => {
  modal.open = false
  event.stopPropagation()
})
</script>

<template>
  <div class="activity-amount" ref="brand">
    <h1 class="title">品牌活动金额</h1>
    <div class="model-button" @click="openModal">
      <span class="button-icon"></span>订单预测模型
    </div>
    <div class="number-wrapper">
      <span v-for="(item,i) in amount" class="number-item" :key="i">{{item}}</span>
      <span class="numer-unit">元</span>
    </div>
    <div class="schedule-wrapper">
      <span class="schedule-title">完成进度</span>
      <div class="schedule-progress">
        <a-progress
          :percent="data.percent"
          :stroke-color="{
            '0%': '#FF8447',
            '100%': '#FFDD23',
          }"
          trailColor="rgba(255, 148, 68, 0.2)"
          :show-info="false"
          :size="['100%', 20]"
        />
      </div>
      <span class="schedule-value">{{data.percent}}%</span>
    </div>
    <div class="people-wrapper">
      <span class="people-number">{{ data.activeCount }}</span>
      <span class="people-text">人参与</span>
    </div>
    <div class="custom-modal" v-if="modal.open">
      <div class="modal-container" ref="modalContainer">
        <div class="modal-close" @click="closeModal">
          <span class="close-icon"></span>
        </div>
        <div class="modal-header">
          <span class="header-title">订单金额预测模型说明</span>
        </div>
        <div class="modal-content">
          <BrandModalContent />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.activity-amount {
  position: relative;
  width: 1470px;
  height: 481px;
  padding-top: 45px;
  margin: auto;
  background: url('@/assets/images/brand/activity-bg.png');
  .title {
    font-size: 48px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    letter-spacing: 2px;
  }
  .model-button {
    position: absolute;
    display: flex;
    align-items: center;
    right: 56px;
    top: 40px;
    width: 230px;
    height: 56px;
    padding: 0 20px;
    border-radius: 28px;
    background: rgba(0, 160, 252, 0.1);
    border: 1px solid rgba(0, 160, 252, 1);
    box-sizing: border-box;
    cursor: pointer;
    color: $text-color;
    font-size: 24px;
    .button-icon {
      width: 26px;
      height: 26px;
      margin-right: 14px;
      background: url('@/assets/images/brand/mode-icon.png');
    }
  }
  .number-wrapper {
    display: flex;
    justify-content: center;
    align-items: end;
    margin-top: 61px;
    font-size: 96px;
    font-weight: bold;
    color: #fff;
    .number-item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 95px;
      height: 136px;
      margin-right: 20px;
      background: url('@/assets/images/brand/number-bg.png');
    }
    .numer-unit {
      font-size: 24px;
      vertical-align: bottom;
    }
  }
  .schedule-wrapper {
    text-align: left;
    width: 1000px;
    margin: auto;
    margin-top: 38px;
    display: flex;
    align-items: center;
    .schedule-title {
      line-height: 70px;
      font-size: 32px;
      font-size: 24px;
      color: $text-color;
      margin-right: 35px;
      vertical-align: middle;
    }
    .schedule-progress {
      padding: 0;
      flex: 1;
      height: 28px;
      padding: 0 3px;
      border: 1px solid #ff9444;
      border-radius: 10px;
    }
    .schedule-value {
      color: #fff;
      font-size: 32px;
      margin-left: 44px;
      vertical-align: middle;
    }
  }
  .people-wrapper {
    margin-top: 20px;
    color: #fff;
    text-align: center;
    .people-number {
      color: #fff;
      font-size: 40px;
    }
    .people-text {
      font-size: 32px;
      color: $text-color;
    }
  }
}
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  .modal-container {
    position: relative;
    width: 2029px;
    height: 1174px;
    background: url('@/assets/images/modal-bg.png');
    padding: 73px 120px;
    .modal-header {
      .header-title {
        font-size: 40px;
        color: #fff;
      }
    }
    .modal-close {
      position: absolute;
      right: 63px;
      top: 58px;
      cursor: pointer;
      .close-icon {
        display: inline-block;
        width: 44px;
        height: 44px;
        background: url('@/assets/images/close.png');
        background-size: 100% 100%;
      }
    }
    .modal-content {
      padding: 40px 0;
    }
  }
}
</style>
