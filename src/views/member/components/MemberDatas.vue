<script setup>
import { reactive, toRefs } from 'vue'
import { getRetailMember } from '@/apis/apiMember'

const datas = reactive({
  retail: 0,
  dateAdd: null,
  memberNum: null,
})

getRetailMember().then(({ code, data }) => {
  if (code === 200 && data) {
    datas.retail = data.retail.toString()
    datas.dateAdd = data.dateAdd
    datas.memberNum = data.memberNum.total.toString()
  }
})

const { retail, dateAdd, memberNum } = toRefs(datas)
</script>

<template>
  <div class="datas-wrapper">
    <div class="wrapper-left">
      <img class="border-image" src="../../../assets/images/border-left.png" />
    </div>
    <div class="wrapper-center">
      <div class="center-row-one">
        <div class="row-item">
          <h1 class="data-title">零售户总数</h1>
          <div class="number-wrapper" v-if="retail">
            <span
              class="number-item"
              v-for="(num, index) in retail"
              :key="index"
              >{{ num }}</span
            >
          </div>
        </div>
        <div class="row-item">
          <h1 class="data-title">会员总数</h1>
          <div class="number-wrapper" v-if="memberNum">
            <span
              class="number-item"
              v-for="(num, index) in memberNum"
              :key="index"
              >{{ num }}</span
            >
          </div>
        </div>
      </div>
      <div class="center-row-two" v-if="dateAdd">
        <div class="member-data-item" v-if="dateAdd.day">
          <div class="data-left">
            <h2 class="data-item-number">{{ dateAdd.day.total }}</h2>
            <span class="data-item-title">本日新增会员</span>
          </div>
          <span class="line"></span>
          <ul class="data-right">
            <li class="data-area-item">
              <span class="area-title">思明区局</span>
              <span class="area-number">{{ dateAdd.day.siming }}</span>
            </li>
            <li class="data-area-item">
              <span class="area-title">湖里区局</span>
              <span class="area-number">{{ dateAdd.day.huli }}</span>
            </li>
            <li class="data-area-item">
              <span class="area-title">集美区局</span>
              <span class="area-number">{{ dateAdd.day.jimei }}</span>
            </li>
            <li class="data-area-item">
              <span class="area-title">第一分局</span>
              <span class="area-number">{{ dateAdd.day.diyi }}</span>
            </li>
          </ul>
        </div>
        <div class="member-data-item" v-if="dateAdd.month">
          <div class="data-left">
            <h2 class="data-item-number">{{ dateAdd.month.total }}</h2>
            <span class="data-item-title">本月新增会员</span>
          </div>
          <span class="line"></span>
          <ul class="data-right">
            <li class="data-area-item">
              <span class="area-title">思明区局</span>
              <span class="area-number">{{ dateAdd.month.siming }}</span>
            </li>
            <li class="data-area-item">
              <span class="area-title">湖里区局</span>
              <span class="area-number">{{ dateAdd.month.huli }}</span>
            </li>
            <li class="data-area-item">
              <span class="area-title">集美区局</span>
              <span class="area-number">{{ dateAdd.month.jimei }}</span>
            </li>
            <li class="data-area-item">
              <span class="area-title">第一分局</span>
              <span class="area-number">{{ dateAdd.month.diyi }}</span>
            </li>
          </ul>
        </div>
        <div class="member-data-item" v-if="dateAdd.year">
          <div class="data-left">
            <h2 class="data-item-number">{{ dateAdd.year.total }}</h2>
            <span class="data-item-title">年度新增会员</span>
          </div>
          <span class="line"></span>
          <ul class="data-right">
            <li class="data-area-item">
              <span class="area-title">思明区局</span>
              <span class="area-number">{{ dateAdd.year.siming }}</span>
            </li>
            <li class="data-area-item">
              <span class="area-title">湖里区局</span>
              <span class="area-number">{{ dateAdd.year.huli }}</span>
            </li>
            <li class="data-area-item">
              <span class="area-title">集美区局</span>
              <span class="area-number">{{ dateAdd.year.jimei }}</span>
            </li>
            <li class="data-area-item">
              <span class="area-title">第一分局</span>
              <span class="area-number">{{ dateAdd.year.diyi }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="wrapper-right">
      <img class="border-image" src="../../../assets/images/border-right.png" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.datas-wrapper {
  display: flex;
  padding-right: 50px;
  .wrapper-left {
    .border-image {
      width: 60px;
      height: 424px;
    }
  }
  .wrapper-center {
    z-index: 2;
    flex: 1;
    .center-row-one {
      display: flex;
      justify-content: space-around;
      .row-item {
        .data-title {
          font-size: 48px;
          color: #fff;
          font-weight: bold;
          letter-spacing: 3px;
          margin-bottom: 30px;
        }
        .number-wrapper {
          font-size: 50px;
          color: #fff;
          font-weight: bold;
          .number-item {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            width: 81px;
            height: 117px;
            border-radius: 6px;
            background: linear-gradient(
              rgba(0, 161, 254, 0.5),
              rgba(0, 0, 0, 0.1),
              rgba(0, 161, 254, 0.5)
            );
          }
        }
      }
    }
    .center-row-two {
      display: flex;
      justify-content: space-around;
      margin-top: 30px;
      .member-data-item {
        width: 390px;
        height: 154px;
        display: inline-flex;
        padding: 10px 0;
        background: rgba(0, 101, 253, 0.05);
        border: 1px solid rgba(0, 161, 254, 0.6);
        box-sizing: border-box;
        .data-left {
          margin-left: 40px;
          text-align: center;
          .data-item-number {
            color: #fff;
            font-size: 55px;
            margin: 10px 0 0 0;
          }
          .data-item-title {
            display: inline-block;
            font-size: 25px;
            color: #00d2ff;
            margin-top: 15px;
          }
        }
        .line {
          display: inline-block;
          width: 2px;
          height: 80px;
          margin: 18px 20px 0 20px;
          background: linear-gradient(
            rgba(0, 0, 0, 0.5),
            rgba(0, 161, 254, 1),
            rgba(0, 0, 0, 0.5)
          );
        }
        .data-right {
          line-height: 28px;
          padding: 0;
          margin-top: 10px;
          margin-left: 10px;
          .data-area-item {
            font-size: 15px;
            .area-title {
              color: #00d2ff;
              margin-right: 10px;
            }
            .area-number {
              color: #fff;
            }
          }
        }
      }
    }
  }
  .wrapper-right {
    .border-image {
      width: 60px;
      height: 424px;
    }
  }
}
</style>
