<script setup>
import {ref} from 'vue'
import {getActivityAmountData} from '@/apis/apiBrand'

const data = ref({})
const getData = () => {
  getActivityAmountData().then(result => {
    data.value = result.data.data
  })
}
getData()

</script>

<template>
  <div class="cultivation-data">
    <div class="cultivation-data-item">
      <div class="data-item-left">
        <img
          class="data-item-image"
          src="@/assets/images/brand/icon-money.png"
        />
      </div>
      <div class="data-item-right">
        <span class="data-item-text">累计销售金额</span>
        <span class="data-item-price">
          <span class="item-price-number">{{data.amount}}</span>元
        </span>
      </div>
    </div>
    <div class="cultivation-data-item">
      <div class="data-item-left">
        <img class="data-item-image" src="@/assets/images/brand/icon-up.png" />
      </div>
      <div class="data-item-right">
        <span class="data-item-text">累计销售量</span>
        <span class="data-item-price">
          <span class="item-price-number">{{data.orderCount}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cultivation-data {
  display: flex;
  padding: 20px 20px 30px 20px;
  .cultivation-data-item {
    display: flex;
    width: 350px;
    height: 128px;
    margin-left: 24px;
    padding: 27px 0 20px 27px;
    border-radius: 4px 4px 4px 4px;
    background: linear-gradient(rgba(12, 27, 72, 0.8), rgba(0, 0, 0, 0));
    box-sizing: border-box;
    .data-item-left {
      margin-right: 25px;
      .data-item-image {
        width: 64px;
        height: 74px;
      }
    }
    .data-item-right {
      display: flex;
      flex-direction: column;
      .data-item-text {
        color: $text-color;
        font-size: 24px;
      }
      .data-item-price {
        color: #fff;
        font-size: 24px;
        margin-top: 5px;
        .item-price-number {
          font-size: 40px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
