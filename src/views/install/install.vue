<!-- e福通可视化大屏 -->
<template>
  <v-scale-screen
    :autoScale="autoScale"
    :width="3200"
    :height="1440"
    :boxStyle="{
      background: `url(${memberBg})`,
      overflow: autoScale ? 'hidden' : 'auto',
    }"
    :wrapperStyle="{ background: '#000414' }"
  >
    <div class="page-box">
      <Header>
        <template #title>
          <img
            class="title-image"
            src="../../assets/images/install/header-title.png"
          />
        </template>
      </Header>
      <!-- 遮罩 -->
      <div class="mask">
        <img src="../../assets/images/install/bg-mask.png" alt="" />
      </div>

      <div class="main-content">
        <div class="main-content-left">
          <div class="main-content-left-item">
            <WrapperTitle title="使用合格率排名" />
            <use-pass-rate-ranking />
          </div>

          <div class="main-content-left-item">
            <WrapperTitle title="安装客户排名" />
            <install-customer-ranking />
          </div>

          <div class="main-content-left-item">
            <WrapperTitle title="E福通安装饱和度分析" />
            <install-saturation-analyse />
          </div>
        </div>

        <div class="main-content-center">
          <center-box></center-box>
        </div>
        <div class="main-content-right">
          <div class="main-content-right-item">
            <WrapperTitle title="E福通使用合格率" />
            <use-pass-rate />
          </div>

          <div class="main-content-right-item">
            <WrapperTitle title="E福通使用不合格明细" />
            <use-disqualification-detail />
          </div>
        </div>
      </div>
    </div>
  </v-scale-screen>
</template>

<script setup>
import VScaleScreen from 'v-scale-screen'
import usePassRateRanking from './components/UsePassRateRanking.vue'
import installCustomerRanking from './components/InstallCustomerRanking.vue'
import installSaturationAnalyse from './components/InstallSaturationAnalyse.vue'
import usePassRate from './components/UsePassRate.vue'
import useDisqualificationDetail from './components/UseDisqualificationDetail.vue'
import centerBox from './components/center.vue'
import memberBg from '@/assets/images/member/member-bg.png'
const autoScale = true
</script>

<style lang="scss" scoped>
.page-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: url(../../assets/images/install/bg.png) no-repeat;
  background-size: 100% 100%;
  position: relative;

  // z-index: 999;
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .main-content {
    width: 100%;
    height: 100%;
    padding: 0 65px 46px;
    position: relative;
    z-index: 2;
    display: flex;

    &-left,
    &-right {
      width: 756px;
    }

    &-center {
      flex: 1;
    }

    &-left {
      display: flex;
      z-index: 2;
      flex-direction: column;
      justify-content: space-between;
      &-item {
        height: 33%;
        padding-bottom: 54px;
      }
    }

    &-right {
      display: flex;
      z-index: 2;
      flex-direction: column;
      &-item:nth-child(1) {
        padding: 0 0 44px;
        height: 414px;
      }

      &-item:nth-child(2) {
        flex: 1;
      }
    }

    &-right,
    &-center,
    &-left {
      height: calc(100% - 137px);
      padding-top: 24px;
      box-sizing: border-box;
    }
  }

  ::v-deep .header-container {
    position: relative;
    z-index: 2;
  }
}
</style>
