<script setup>
import { reactive } from 'vue'
import { getCultivate } from '@/apis/apiMember'

const cultivate = reactive({})
getCultivate().then(({ code, data }) => {
  if (code === 200 && data) {
    for (const key in data) {
      cultivate[key] = data[key]
    }
  }
})
</script>

<template>
  <div class="content-main">
    <div class="content-item">
      <img class="item-image" src="@/assets/images/member/cultivate-1.png" />
      <span class="item-number">{{ cultivate.incubationPeriod }}</span>
      <span class="item-text">孵化期</span>
    </div>
    <div class="content-item">
      <img class="item-image" src="@/assets/images/member/cultivate-2.png" />
      <span class="item-number">{{ cultivate.growthPeriod }}</span>
      <span class="item-text">成长期</span>
    </div>
    <div class="content-item">
      <img class="item-image" src="@/assets/images/member/cultivate-3.png" />
      <span class="item-number">{{ cultivate.matureStage }}</span>
      <span class="item-text">成熟期</span>
    </div>
    <div class="content-item">
      <img class="item-image" src="@/assets/images/member/cultivate-4.png" />
      <span class="item-number">{{ cultivate.notHatched }}</span>
      <span class="item-text">未孵化</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-main {
  display: flex;
  justify-content: space-around;
  padding: 70px 50px;
  .content-item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    .item-image {
      width: 82px;
      height: 95px;
    }
    .item-number {
      margin-top: 20px;
      font-size: 42px;
      font-weight: bold;
      color: #fff;
    }
    .item-text {
      margin-top: 10px;
      color: #00d2ff;
      font-size: 28px;
    }
  }
}
</style>
