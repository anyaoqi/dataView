<script setup>
import { reactive } from 'vue'
import {ref} from 'vue'
import {getSalesRankingData} from '@/apis/apiBrand'

const dataList = ref([])

const getData = async () => {
  const result = await getSalesRankingData()
  const list = result.data.data
  for (let i = 0; i < list.length; i++) {
    const data = {}
    data.name = list[i].product_name
    data.value = list[i].sale_qty
    dataList.value.push(data)
  }
}

getData()

const config = reactive({
  data: dataList,
  // waitTime: 100000,
  unit: '元',
})
</script>

<template>
  <div class="sales-ranking">
    <ScrollRankingBoard :config="config" style="width: 100%; height: 500px">
      <template v-slot="{ item }">
        <div class="row-item">
          <div class="rank-left">
            <img class="rank-image" src="@/assets/images/brand/liqun.png" />
          </div>
          <div class="rank-right">
            <div class="rank-info">
              <span>No.{{ item.ranking }} {{ item.name }}</span>
              <span class="rank-info-value">{{ item.value }}</span>
            </div>
            <div class="rank-progress">
              <a-progress
                :stroke-color="{
                  '0%': '#00FDF2',
                  '100%': '#00CDFF',
                }"
                trailColor="rgba(0, 101, 253, 0.2)"
                :percent="item.percent"
                :show-info="false"
                :size="15"
              />
            </div>
          </div>
        </div>
      </template>
    </ScrollRankingBoard>
  </div>
</template>

<style lang="scss" scoped>
.sales-ranking {
  padding: 30px 20px;
  box-sizing: border-box;
  .row-item {
    transition: all 0.3s;
  }
  .rank-left {
    display: inline-flex;
    vertical-align: top;
    .rank-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #ffdc50;
    }
  }
  .rank-right {
    display: inline-flex;
    flex-direction: column;
    margin-left: 32px;
    width: 633px;
    vertical-align: top;
    .rank-info {
      font-size: 24px;
      color: $text-color;
      display: inline-flex;
      justify-content: space-between;
      .rank-info-value {
        color: #fff;
      }
    }
    .rank-progress {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
