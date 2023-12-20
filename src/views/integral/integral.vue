<!-- 积分推广 -->
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
            src="../../assets/images/integral/header-title.png"
          />
        </template>
      </Header>

      <!-- 遮罩 -->
      <!-- <div class="mask">
                <img src="../../assets/images/integral/bg-mask.png" alt="">
            </div> -->

      <div class="main-content">
        <div class="main-content-left">
          <div class="main-content-left-item">
            <WrapperTitle title="品牌活动一览" />
            <brand-activities-list-box />
          </div>

          <div class="main-content-left-item">
            <WrapperTitle title="活动排名" />
            <brand-activities-ranking-box></brand-activities-ranking-box>
          </div>
        </div>

        <div class="main-content-center">
          <div class="main-content-center-item">
            <latest-activity-statistics-box />
          </div>

          <div class="main-content-center-item width100">
            <WrapperTitle title="积分发放趋势" />
            <point-release-trend-box />
          </div>
        </div>
        <div class="main-content-right">
          <div class="main-content-right-item" style="height: 100%">
            <WrapperTitle title="品牌活动统计" />
            <brand-activities-Statistics-box />
          </div>
        </div>
      </div>
    </div>
  </v-scale-screen>
</template>

<script setup>
import VScaleScreen from 'v-scale-screen'
import brandActivitiesListBox from './components/BrandActivitiesList.vue'
import brandActivitiesRankingBox from './components/BrandActivitiesRanking.vue'
import latestActivityStatisticsBox from './components/LatestActivityStatistics.vue'
import BrandActivitiesStatisticsBox from './components/BrandActivitiesStatistics.vue'
import pointReleaseTrendBox from './components/PointReleaseTrend.vue'
import memberBg from '@/assets/images/member/member-bg.png'
const autoScale = true
</script>

<style lang="scss" scoped>
.width100 {
  width: 100%;
}

.page-box {
  width: 100%;
  height: 100%;
  padding: 0 40px 40px;
  box-sizing: border-box;
  background: url(../../assets/images/integral/bg.png) no-repeat;
  background-size: 100% 100%;
  position: relative;

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
    display: flex;
    align-items: flex-start;
    position: relative;
    z-index: 2;

    &-right {
      width: 760px;
    }

    &-center {
      flex: 1;
      width: 1632px;
      padding: 0 45px;
      display: flex;
      flex-direction: column;

      &-item:nth-child(1) {
        flex: 1;
      }
    }

    &-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-item:nth-child(2) {
        flex: 1;
        padding-top: 60px;
      }
    }

    &-right,
    &-center,
    &-left {
      height: calc(100% - 137px);
      padding-top: 15px;
      box-sizing: border-box;
    }
  }
}

::v-deep .header-container {
  position: relative;
  z-index: 2;
}

::v-deep .wrapper-title {
  height: 61px;
  background-size: contain;
  background-repeat: no-repeat;
}

::v-deep
  .ant-progress.ant-progress-line.ant-progress-status-normal.ant-progress-show-info.ant-progress-small {
  margin-bottom: 0 !important;
}
</style>
