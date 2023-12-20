<script setup>

import {ref} from 'vue'
import {getUserTabData} from '@/apis/apiBrand'

const dataList = ref([])

const getData = async () => {
  const result = await getUserTabData()
  dataList.value = result.data.data
}

getData()

</script>

<template>
  <div class="user-tab">
    <div class="title">用户画像标签</div>
    <div class="content-wrapper">
      <div class="wrapper-left" >
        <span class="bubble-item bubble-blue-sm" v-if="dataList.length > 5"> {{dataList[5].name}} </span>
        <span class="bubble-item bubble-blue-sm" v-if="dataList.length > 7"> {{dataList[7].name}} </span>
        <span class="bubble-item bubble-blue-sm" v-if="dataList.length > 9"> {{dataList[9].name}} </span>
      </div>
      <div class="wrapper-center">
        <span class="bubble-item bubble-red" v-if="dataList.length > 0"> {{dataList[0].name}} </span>
        <span class="bubble-item bubble-yellow" v-if="dataList.length > 1"> {{dataList[1].name}} </span>
        <span class="bubble-item bubble-orange" v-if="dataList.length > 2"> {{dataList[2].name}} </span>
        <span class="bubble-item bubble-green" v-if="dataList.length > 3"> {{dataList[3].name}} </span>
        <span class="bubble-item bubble-blue" v-if="dataList.length > 4"> {{dataList[4].name}} </span>
      </div>
      <div class="wrapper-right">
        <span class="bubble-item bubble-blue-sm" v-if="dataList.length > 6"> {{dataList[6].name}} </span>
        <span class="bubble-item bubble-blue-sm" v-if="dataList.length > 8"> {{dataList[8].name}} </span>
        <span class="bubble-item bubble-blue-sm" v-if="dataList.length > 10"> {{dataList[10].name}} </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes updown {
  0% {
    transform: translateY(0) scale(0.8);
  }

  100% {
    transform: translateY(-50px) scale(1.2);
  }
}
@keyframes leftRight {
  0% {
    transform: translateX(50px);
  }

  100% {
    transform: translateX(-50px);
  }
}

.user-tab {
  margin-top: 0px;
  .title {
    font-size: 26px;
    color: #fff;
    height: 82px;
    line-height: 92px;
  }
  .content-wrapper {
    width: 745px;
    height: 370px;
    background: url('@/assets/images/brand/bg-mask.png') no-repeat;
    display: flex;
    .bubble-item {
      position: absolute;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 85px;
      height: 85px;
      border-radius: 50%;
      color: #fff;
      font-size: 18px;
      text-align: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      transition: all 0.2s;
      transform: scale(1);
      animation: updown 5s infinite alternate-reverse;
      cursor: pointer;
      &:hover {
        animation: none;
        transform: translateY(-50%) scale(1.5);
      }
      &.bubble-red {
        left: 122px;
        top: -38px;
        background-image: url('@/assets/images/brand/bubble-red.png');
      }
      &.bubble-yellow {
        right: -5px;
        top: 0px;
        background-image: url('@/assets/images/brand/bubble-yellow.png');
      }
      &.bubble-orange {
        right: -15px;
        top: 110px;
        background-image: url('@/assets/images/brand/bubble-orange.png');
      }
      &.bubble-green {
        left: 15px;
        bottom: 100px;
        background-image: url('@/assets/images/brand/bubble-green.png');
      }
      &.bubble-blue {
        left: 0;
        top: 30px;
        background-image: url('@/assets/images/brand/bubble-blue.png');
      }
      &.bubble-blue-sm {
        width: 64px;
        height: 64px;
        color: rgba(64, 167, 255, 0.8);
        font-size: 16px;
        background-image: url('@/assets/images/brand/bubble-blue-small.png');
        &:nth-of-type(1) {
          left: 85px;
          top: 80px;
        }
        &:nth-of-type(2) {
          top: 165px;
          left: 45px;
        }
        &:nth-of-type(3) {
          bottom: 50px;
          right: 10px;
        }
      }
    }
    .wrapper-center {
      position: relative;
      width: 343px;
      height: 330px;
      margin: auto;
      padding-top: 44px;
      margin-bottom: 0;
      background: url('@/assets/images/brand/base-bg.png') no-repeat;
    }
    .wrapper-left {
      position: relative;
      flex: 1;
    }
    .wrapper-right {
      flex: 1;
      position: relative;
      .bubble-blue-sm {
        &:nth-of-type(1) {
          right: 85px;
          top: 80px;
          left: auto;
        }
        &:nth-of-type(2) {
          top: 165px;
          right: 45px;
          left: auto;
        }
        &:nth-of-type(3) {
          bottom: 50px;
          left: 10px;
        }
      }
    }
  }
}
</style>
