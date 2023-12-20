<script setup>
import brandBg from '@/assets/images/brand/brand-bg.png'
import { getTableData } from '@/apis/apiBrand'
import BrandCultivationData from './components/BrandCultivationData.vue'
import BrandSalesTrend from './components/BrandSalesTrend.vue'
import BrandSalesRanking from './components/BrandSalesRanking.vue'
import BrandDistribution from './components/BrandDistribution.vue'
import BrandProfession from './components/BrandProfession.vue'
import BrandUserTab from './components/BrandUserTab.vue'
import BrandActivityAmount from './components/BrandActivityAmount.vue'
import BrandMemberData from './components/BrandMemberData.vue'

const autoScale = true

getTableData()
  .then((res) => {
    console.log('getTableData', res)
  })
  .catch((err) => {
    console.log(err)
  })
</script>

<template>
  <v-scale-screen
    :autoScale="autoScale"
    :width="3200"
    :height="1440"
    :boxStyle="{
      // background: `url(${brandBg})`,
      overflow: autoScale ? 'hidden' : 'auto',
    }"
    :wrapperStyle="{
      background: `url(${brandBg})`,
    }"
  >
    <div id="brand">
      <Header>
        <template #title>
          <img
            class="title-image"
            src="@/assets/images/brand/brand-title.png"
          />
        </template>
      </Header>
      <div class="content brand-page">
        <!-- 左侧区域 -->
        <div class="left-container">
          <div class="wrapper-item left-wrapper-one">
            <WrapperTitle title="品牌培育数据" width="760px" />
            <div class="wrapper-content">
              <BrandCultivationData />
            </div>
          </div>
          <div class="wrapper-item left-wrapper-two">
            <WrapperTitle title="累计销售趋势" width="760px">
              <template #subtitle>
                <span class="title-subtitle">单位：万元</span>
              </template>
            </WrapperTitle>
            <div class="wrapper-content">
              <BrandSalesTrend />
            </div>
          </div>
          <div class="wrapper-item left-wrapper-three">
            <WrapperTitle title="品牌销售排名" width="760px">
              <template #subtitle>
                <span class="title-subtitle">单位：条</span>
              </template>
            </WrapperTitle>
            <div class="wrapper-content">
              <BrandSalesRanking />
            </div>
          </div>
        </div>
        <!-- 中间区域 -->
        <div class="center-container">
          <!-- 品牌活动金额 -->
          <BrandActivityAmount />
          <!-- 会员发展数据 -->
          <BrandMemberData />
        </div>
        <!-- 右侧区域 -->
        <div class="right-container">
          <div class="wrapper-item left-wrapper-two">
            <WrapperTitle title="用户属性分析" width="760px" />
            <BrandDistribution />
            <BrandProfession />
            <BrandUserTab />
          </div>
        </div>
      </div>
    </div>
  </v-scale-screen>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  padding: 24px 40px;
  .title-subtitle {
    color: rgba(0, 210, 255, 0.6);
    font-size: 22px;
  }
  .center-container {
    flex: 1;
    padding: 0 60px;
  }
}

// .brand-page {
//   padding: 18px;
//   display: flex;
//   .title-wrapper {
//     color: #fff;
//     margin-bottom: 50px;
//     h1 {
//       font-size: 48px;
//       margin: 0;
//     }
//     .subtitle {
//       line-height: 32px;
//       font-size: 24px;
//       color: #ccc;
//     }
//   }
//   .wrapper {
//     margin-top: 16px;
//     position: relative;
//     .wrapper-title {
//       &::before {
//         content: '';
//         display: inline-block;
//         width: 4px;
//         height: 30px;
//         background: #31a7ff;
//         margin-right: 20px;
//         vertical-align: middle;
//       }
//       .title-text {
//         margin: 0;
//         color: #fff;
//         font-size: 28px;
//         display: inline-block;
//         vertical-align: middle;
//       }
//     }
//   }
//   .left-container {
//     width: 500px;
//     .cultivate-wrapper {
//       .wrapper-content {
//         height: 300px;
//       }
//     }
//     .sale-wrapper {
//       .wrapper-content {
//         height: 350px;
//       }
//     }
//     .ranking-wrapper {
//       .wrapper-content {
//         height: 500px;
//       }
//     }
//   }
//   .center-container {
//     flex: 1;
//     height: 500px;
//     text-align: center;
//     color: #fff;
//     // border: 1px solid darkcyan;
//     .center-title {
//       margin-top: 100px;
//       font-size: 68px;
//       letter-spacing: 5px;
//     }
//     .price-wrapper {
//       margin-top: 50px;
//       font-size: 38px;
//       span {
//         font-size: 80px;
//         display: inline-block;
//         padding: 10px;
//         background: rgba($color: #176da7, $alpha: 0.6);
//         margin-right: 10px;
//         border-radius: 10px;
//         vertical-align: bottom;
//       }
//     }
//     .schedule-wrapper {
//       text-align: left;
//       width: 1000px;
//       margin: auto;
//       margin-top: 60px;
//       .schedule-title {
//         line-height: 70px;
//         font-size: 32px;
//       }
//     }
//     .people-wrapper {
//       margin-top: 50px;
//       color: #fff;
//       .people-text {
//         font-size: 42px;
//         letter-spacing: 4px;
//         .people-number {
//           font-size: 68px;
//         }
//       }
//     }
//     .member-wrapper {
//       margin-top: 100px;
//       height: 680px;
//       background: rgba($color: #fff, $alpha: 0.1);
//       .member-title {
//         text-align: center;
//       }
//     }
//   }
//   .right-container {
//     .icon-wrapper {
//       color: #fff;
//       font-size: 28px;
//       margin-bottom: 50px;
//       .full-item {
//         margin-left: 30px;
//         cursor: pointer;
//       }
//     }
//     .ranking-wrapper {
//       .wrapper-content {
//         height: 1000px;
//       }
//     }
//   }
// }
</style>
