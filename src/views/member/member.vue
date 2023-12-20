<script setup>
// 零售户会员培育情况
import MemberCultivate from './components/MemberCultivate.vue'
import MemberDistribution from './components/MemberDistribution.vue'
import MemberSalesRatio from './components/MemberSalesRatio.vue'
import MemberAddTrend from './components/MemberAddTrend.vue'
import MembersRanking from './components/MembersRanking.vue'
import MemberHeatMap from './components/MemberHeatMap.vue'
import MemberDatas from './components/MemberDatas.vue'
import masker from '@/assets/images/masker.png'
import memberBg from '@/assets/images/member/member-bg.png'

const autoScale = true

const viewRule = () => {
  console.log('aaa')
}
</script>

<template>
  <v-scale-screen
    :autoScale="autoScale"
    :width="3200"
    :height="1440"
    :boxStyle="{
      background: `url(${memberBg})`,
      overflow: autoScale ? 'hidden' : 'auto',
    }"
    :wrapperStyle="{
      // backgroundColor: '#000414',
      background: `url(${masker}) 100% 100%`,
    }"
  >
    <Header>
      <template #title>
        <img
          class="title-image"
          src="@/assets/images/member/member-title.png"
        />
      </template>
    </Header>
    <div class="content">
      <div class="left-container">
        <!-- 零售户会员培育情况 -->
        <div class="wrapper-item left-wrapper-one">
          <WrapperTitle
            title="零售户会员培育情况"
            subtitle="规则说明"
            @click="viewRule"
          />
          <div class="wrapper-content">
            <MemberCultivate />
          </div>
        </div>
        <!-- 会员分布情况 -->
        <div class="wrapper-item left-wrapper-two">
          <WrapperTitle title="会员分布情况" />
          <div class="wrapper-content">
            <MemberDistribution />
          </div>
        </div>
      </div>
      <div class="center-container">
        <MemberDatas />
        <MemberHeatMap />
      </div>
      <div class="right-container">
        <!-- 会员消费品类销售占比 -->
        <div class="wrapper-item right-wrapper-one">
          <WrapperTitle title="会员消费品类销售占比" />
          <div class="wrapper-content">
            <MemberSalesRatio />
          </div>
        </div>
        <!-- 会员新增走势 -->
        <div class="wrapper-item right-wrapper-two">
          <WrapperTitle title="会员新增走势" />
          <div class="wrapper-content">
            <MemberAddTrend />
          </div>
        </div>
        <!-- 零售户拓展会员数排名 -->
        <div class="wrapper-item right-wrapper-three">
          <WrapperTitle title="零售户拓展会员数排名" />
          <div class="wrapper-content">
            <MembersRanking />
          </div>
        </div>
      </div>
    </div>
  </v-scale-screen>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  padding: 24px 58px;
  .center-container {
    flex: 1;
  }
}
.left-container,
.right-container {
  z-index: 2;
}
</style>
