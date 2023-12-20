<script setup>
import {ref, reactive, onMounted} from 'vue'
import titleBg860 from '@/assets/images/title-bg-860x75.png'
import titleBg606 from '@/assets/images/title-bg-606x75.png'
import titleBg1833 from '@/assets/images/title-bg-1833x75.png'
import getSummaryDataJson from '@/mock/brand/getSummaryData.json'
import getSummaryAreaDataJson from '@/mock/brand/getSummaryAreaData.json'
import getSummaryStreetDataJson from '@/mock/brand/getSummaryStreetData.json'
import Table from './Table.vue'

const summaryData = ref([])
const summaryAreaData = ref([])
const summaryStreetData = ref([])

const getSummaryData = () => {
  const dataList = getSummaryDataJson.data
  for (let i = 0; i < dataList.length; i++) {
    const d = dataList[i]
    summaryData.value.push([d.ycfs,d.nhyd,d.nhydpx,d.sm,d.mxsf])
  }
  console.log(summaryData)
}

const getSummaryAreaData = () => {
  const dataList = getSummaryAreaDataJson.data
  for (let i = 0; i < dataList.length; i++) {
    const d = dataList[i]
    summaryAreaData.value.push([d.area,d.realValue,d.value,d.diff])
  }
  console.log(summaryAreaData)
}

const getSummaryStreetData = () => {
  const dataList = getSummaryStreetDataJson.data
  for (let i = 0; i < dataList.length; i++) {
    const d = dataList[i]
    const color = '#8FD0A1'
    const color2 = '#F87C7E'
    if (d.TGI > 1){
      d.TGI_div = `<span class="block-color" style="background-color: ${color}">${d.TGI}</span>`
    } else {
      d.TGI_div = `<span class="block-color" style="background-color: ${color2}">${d.TGI}</span>`
    }
    if (d.diff1 < 0){
      d.diff1_div = `<span class="block-color" style="background-color: ${color}">${d.diff1}</span>`
    } else {
      d.diff1_div = `<span class="block-color" style="background-color: ${color2}">${d.diff1}</span>`
    }
    if (d.diff2 < 0){
      d.diff2_div = `<span class="block-color" style="background-color: ${color}">${d.diff2}</span>`
    } else {
      d.diff2_div = `<span class="block-color" style="background-color: ${color2}">${d.diff2}</span>`
    }
    summaryStreetData.value.push([d.distinct,d.street,d.amount,d.ecount,d.eprice,d.TGI_div,d.eftCount,d.ycPrice,d.diff1_div,d.ycPrice,d.mxyc,d.diff2_div])
  }
  console.log(summaryStreetData)
}

onMounted(() => {
  getSummaryData()
  getSummaryAreaData()
  getSummaryStreetData()
})
// 总体说明
const summaryConfig = reactive({
  columnWidth: [93, 175, 180, 180],
  header: ['预测方式', '拟合优度', '拟合优度排序', '说明', '模型算法'],
  data: summaryData,
})

// 总体分析
const analyzeConfig = reactive({
  columnWidth: [230, 145, 145],
  header: [' ', '实际值', '预测值', '差距'],
  index: false,
  data: summaryAreaData,
})

// 街道分析
const streetConfig = reactive({
  columnWidth: [60, 96, 115, 142, 199, 283],
  rowNum: 8,
  header: [
    '区域',
    '街道',
    '订单金额',
    '订单金额/E福通个数',
    '同翔总体订单金额/E福通总个数',
    'TGI',
    'E福通个数',
    '基于订单金额的预测',
    '差距',
    '基于多因素模型预测',
    '差距',
  ],
  data: summaryStreetData,
})

const currentPage = ref(2)

const pageChange = (index) => {
  currentPage.value = index
}
</script>

<template>
  <div class="row-one">
    <!-- 总体说明 -->
    <div class="summary-wrapper">
      <WrapperTitle title="总体说明" width="860px" :background="titleBg860" />
      <p class="description">
        <marquee>
          街道E福通合理数量的预测，本文采用6种方式进行预测其中基于多因兼模型的预测效果最佳，基于订单金额的预测权型效果排名第二;为了方便解释，接下去以基于订单金额的预测进行说明:
        </marquee>
      </p>
      <div class="wrapper-table">
        <Table :config="summaryConfig" />
      </div>
    </div>
    <!-- 总体分析 -->
    <div class="analyze-wrapper">
      <WrapperTitle title="总体分析" width="606px" :background="titleBg606" />
      <p class="description">
        <marquee>
          总量预测的E福通个数与实际的预测基本一致，其中同安实际值比预测值偏多，翔安的偏少;;为了方便解释，接下去以基于订单金额的预测进行说明:
        </marquee>
      </p>
      <div class="wrapper-table">
        <Table :config="analyzeConfig" />
      </div>
    </div>
  </div>
  <!-- 街道分析 -->
  <div class="street-analysis">
    <WrapperTitle title="街道分析" width="1833px" :background="titleBg1833" />
    <p class="description">
      基于订单金额的预测模型: 合理的E福通户数=某区域的订单金额/629598<br />
      TGl:群体优势指数:特定群体的值/总体的值，在本次分析为
      某一个街道的订单金额/通个数] /同用总体订单金额/福通总个数]
    </p>
    <div class="wrapper-table">
      <Table :config="streetConfig" height="334px" />
    </div>
    <div class="pagination-wrapper">
      <a-pagination
        v-model:current="currentPage"
        :total="50"
        @change="pageChange"
        show-less-items
      />
      <span class="pagination-total">合计96条</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.description {
  font-size: 14px;
  color: $text-color;
  margin: 10px 0;
}
.row-one {
  display: flex;
  .summary-wrapper {
    width: 1170px;
    margin-right: 50px;
    .wrapper-table {
    }
  }
  .analyze-wrapper {
    width: 606px;
    .wrapper-table {
      ::v-deep(.table-scroll-wrapper) {
        .header {
          .header-item:first-child {
            color: $text-color;
            text-align: left;
            padding-left: 40px;
          }
        }
        .rows .row-item {
          .ceil:first-child {
            color: $text-color;
            text-align: left;
            padding-left: 40px;
          }
        }
      }
    }
  }
}
.street-analysis {
  margin-top: 46px;
  .wrapper-table {
    ::v-deep(.table-scroll-wrapper) {
      .header {
      }
      .rows .row-item {
        .ceil:nth-of-type(2),
        .ceil:nth-of-type(3) {
          color: $text-color;
        }
        .ceil {
          .index {
            display: inline-block;
            width: 44px;
            height: 26px;
            line-height: 26px;
            background: url('../../../assets/images/number-arrow.png');
            color: #111927;
          }
          .block-color {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 34px;
            width: 90px;
          }
        }
      }
    }
  }
  .pagination-wrapper {
    display: flex;
    align-items: center;
    margin-top: 16px;
    ::v-deep(.ant-pagination) {
      .ant-pagination-item,
      .ant-pagination-next,
      .ant-pagination-prev {
        background-color: #000;
        border: 1px solid rgba(0, 162, 255, 0.5);
        width: 28px;
        height: 28px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        a {
          color: #91d1f1;
        }
        .ant-pagination-item-link {
          .anticon {
            color: #91d1f1;
          }
        }
      }
      .ant-pagination-item-active {
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(0, 162, 255, 1);
      }
    }
    .pagination-total {
      font-size: 14px;
      color: #91d1f1;
      margin-left: 30px;
    }
  }
}
</style>
