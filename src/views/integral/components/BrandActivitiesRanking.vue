<!-- 活动排名 -->
<template>
  <div class="brand-activity-ranking">
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        class="brand-activity-ranking-item"
      >
        <div>
          <img
            src="../../../assets/images/integral/gold-medal.png"
            v-if="index == 0"
          />
          <img
            src="../../../assets/images/integral/silver-medal.png"
            v-else-if="index == 1"
          />
          <img
            src="../../../assets/images/integral/bronze-medal.png"
            v-else-if="index == 2"
          />
          <p v-else class="rank-num">{{ index + 1 }}</p>
        </div>
        <p class="factory_name">{{ item.factory_name }}</p>
        <!-- <div class="progress">

        </div> -->
        <a-progress
          :stroke-color="{
            from: '#00FDF2',
            to: '#00CDFF',
          }"
          :percent="item.process"
          trailColor="rgba(10, 81, 249, 0.125)"
          size="small"
          :showInfo="false"
        />
        <p>{{ item.num }} 万</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const list = ref([
  {
    factory_name: '浙江中烟',
    num: 2.105,
    process: 10,
  },
  {
    factory_name: '云南中烟',
    num: 0,
    process: 0,
  },
  {
    factory_name: '福建中烟',
    num: 0,
    process: 0,
  },
])
</script>

<style lang="scss" scoped>
.brand-activity-ranking {
  width: 100%;
  color: #fff;

  &-item {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 24px;
    padding-top: 40px;
    height: 26px;
    box-sizing: content-box;
    white-space: nowrap;
    .factory_name {
      color: $color-primary;
      padding: 0 20px 0 17px;
    }
    .rank-num {
      width: 24px;
      height: 24px;
      font-size: 18px;
      border-radius: 50%;
      color: #0e1114;
      text-align: center;
      line-height: 24px;
      background: linear-gradient(0deg, #12d3ff, #a2efff);
    }
  }
}
</style>
