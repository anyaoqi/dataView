<!-- 使用合格率排名 -->
<template>
  <div class="center">
    <!-- <img src="../../../assets/images/install/bg-mask.png" alt=""> -->
    <ul class="center-top">
      <img src="../../../assets/images/install/left.png" alt="" />
      <li>
        <p class="title">零售户总数</p>
        <div class="numbers">
          <p
            class="numbers-item"
            v-for="(item, index) in total_customers"
            :key="index"
          >
            {{ item }}
          </p>
        </div>

        <div class="process">
          <div class="info">
            <p>安装率</p>
            <p class="rate">14.0%</p>
          </div>
          <!-- <a-progress :percent="14.0" :steps="22" stroke-color="#FF8447"
                    status="active"
                    trailColor="rgba(10, 81, 249, 0.125)" /> -->
          <div class="pecent">
            <dv-percent-pond
              :config="configInstallRate"
              style="width: 100%; height: 20px"
            />
            <dv-percent-pond
              :config="config"
              style="width: 100%; height: 20px"
              class="pecent-bg"
            />
          </div>
        </div>
      </li>

      <li>
        <p class="title">e福通安装总数</p>
        <div class="numbers">
          <p
            class="numbers-item"
            v-for="(item, index) in total_install"
            :key="index"
          >
            {{ item }}
          </p>
        </div>

        <div class="process">
          <div class="info">
            <p>合格率</p>
            <p class="rate">12.85%</p>
          </div>
          <!-- <a-progress :percent="50" :steps="20" /> -->
          <div class="pecent">
            <dv-percent-pond
              :config="configPassRate"
              style="width: 100%; height: 20px"
            />
            <dv-percent-pond
              :config="config"
              style="width: 100%; height: 20px"
              class="pecent-bg"
            />
          </div>
        </div>
      </li>

      <img src="../../../assets/images/install/right.png" alt="" />
    </ul>

    <!-- <map-box class="center-map"></map-box> -->
    <!-- <b-map-box></b-map-box> -->
    <bai-du-map-box></bai-du-map-box>
  </div>
</template>

<script setup>
// import mapBox from './map.vue'
import BaiDuMapBox from './BaiDuMapBox.vue'
import { ref } from 'vue'
const total_customers = ref('23650')
const total_install = ref('3040')

// 安装率
const configInstallRate = ref({
  value: 12.85,
  // lineDash: [7, 1],
  colors: ['#FF8447', '#FFDD23'],
  borderWidth: 0,
  formatter: '',
  localGradient: true,
  lineDash: [8, 5],
})

// 合格率
const configPassRate = ref({
  value: 12.85,
  colors: ['#3EB7FC', '#23FF95'],
  borderWidth: 0,
  formatter: '',
  localGradient: true,
  lineDash: [8, 5],
})
// 背景进度池配置
const config = ref({
  value: 100,
  colors: ['rgba(10, 81, 249, 0.125)', 'rgba(10, 81, 249, 0.125)'],
  borderWidth: 0,
  formatter: '',
  lineDash: [8, 5],
})
</script>

<style lang="scss" scoped>
.center {
  color: #fff;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;

  &-top {
    font-size: 48px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 91px 0 77px;
    position: relative;
    z-index: 2;

    .title {
      padding-bottom: 33px;
    }

    li {
      padding-top: 30px;
    }

    .numbers {
      display: flex;
      font-size: 82px;
      font-weight: bold;

      &-item {
        width: 82px;
        height: 118px;
        background: url(../../../assets/images/install/num-bg.png) no-repeat;
        text-align: center;
        line-height: 118px;
        margin-right: 11.5px;
      }
    }

    .process {
      font-size: 24px;
      color: #00d2ff;
      width: 454px;
      height: 127px;
      border-radius: 4px 4px 4px 4px;
      background: #0065fd0d;
      margin-top: 31px;
      padding: 29px;
      box-sizing: border-box;
      border: 1px solid rgba($color: #0f3e73, $alpha: 0.5);

      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 26px;

        .rate {
          color: #fff;
        }
      }
    }

    .pecent {
      position: relative;

      &-bg {
        position: absolute;
        top: 0;
      }
    }
  }
}
</style>
