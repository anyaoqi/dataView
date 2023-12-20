<script setup>
import { ref, reactive } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import Tabs from '@/components/Tabs/Tabs.vue'
import ProgressChart from './ProgressChart.vue'
import {getMemberData, getMemberRadarAvgData, getMemberRadarData, getNewMemberData} from '@/apis/apiBrand'
import {message} from 'ant-design-vue'
const userName = ref('')
const data = ref({})
const randarAvg = ref([])
const randarMember = ref([])
const tableList = ref([])
const memberCount = ref({
  newMember:0,
  cardMember:0,
  salesMember:0,
})

const option = reactive({
  color: ['#00FDF2', '#FF8347'],
  title: {
    text: '会员雷达图',
    textStyle: {
      color: '#fff',
      fontSize: '26px',
    },
  },
  tooltip: {
    trigger: 'item',
    show:true
  },
  legend: {
    left: 'right',
    icon: 'circle',
    itemGap: 30,
    itemWidth: 14,
    itemHeight: 14,
    textStyle: {
      color: '#00D2FF',
      fontSize: '24px',
    },
  },
  radar: {
    // shape: 'circle',
    center: ['50%', '60%'],
    radius: '50%',
    axisName: {
      color: '#00D2FF',
      fontSize: '24px',
      rich: {
        a: {
          fontSize: '24px',
          color: '#00D2FF',
        }
      },
    },
    indicator: [
      { name: '购买频次', max: 6 },
      { name: '客单价', max: 6 },
      { name: '客单量', max: 6 },
      { name: '购买卷烟价位段', max: 6 },
      { name: '品牌忠诚度', max: 6 },
      { name: '活动参与度', max: 6 },
    ],
    splitArea: {
      show: false,
      areaStyle: {
        color: 'rgba(255,0,0,0)', // 图表背景的颜色
      },
    },
    splitLine: {
      lineStyle: {
        width: 2,
        color: 'rgba(0, 162, 255, 0.4)', // 设置网格的颜色
      },
    },
  },
  series: [
    {
      name: '会员雷达图',
      type: 'radar',
      areaStyle: {
        opacity: 0.2,
      },
      symbol: 'rect', //去掉折线上的小圆点
      data: [
        {
          value: randarAvg,
          name: '区域平均分',
        },
        {
          value: randarMember,
          name: '会员分',
        },
      ],
      label: {
        show: true,
        fontSize:20,
        color:'#ffffff',
        formatter: function (params) {
          return params.value
        }
      }
    },
  ],
})

const tabData = [
  { id: '7', name: '7天' },
  { id: '15', name: '15天' },
  { id: '30', name: '30天' },
]
const tab = reactive({
  current: tabData[0],
  data: tabData,
})

const toggleTab = (item) => {
  tab.current = item
  getData(item.id)
}

// 会员列表
const tableConfig = reactive({
  header: ['', '', ''],
  headerHeight: 0,
  data: tableList,
  index: true,
  rowNum: 3,
  oddRowBGC: 'transparent',
  evenRowBGC: 'transparent',
  columnWidth: [69, 162, 210, 300],
  align: ['center'],
})

const getData = (type = 7) => {
  const param = {
    type
  }
  getMemberData(param).then(result => {
    console.log(result)
    data.value = result.data.data
    memberCount.value.newMember = data.value.newMember
    memberCount.value.cardMember = data.value.cardMember
    memberCount.value.salesMember = data.value.salesMember
  })
}

const getTableData = () => {
  getNewMemberData().then(result => {
    const dataList = result.data.data
    for (let i = 0; i < dataList.length; i++) {
      const d = dataList[i]
      const data = [d.nick_name,d.age+'-'+d.sex+'-'+d.city ,d.syscreatetime]
      tableList.value.push(data)
    }
  })
}
const getRadarData = () => {
  const keyword = userName.value
  if (keyword === ''){
    return
  }
  const param = {
    keyword: keyword
  }
  getMemberRadarData(param).then(result => {
    if (result.data.data.length === 0) {
      randarMember.value = []
      message.error('未查到会员信息')
      return
    }
    const data = result.data.data[0]
    randarMember.value = [data.buy_count,data.price,data.order,data.product_price_type,data.brand_loyalty,data.active_count]
  })
}
const getRadarAvgData = () => {
  getMemberRadarAvgData().then(result => {
    const data = result.data.data
    randarAvg.value = [data.buy_count,data.price,data.order,data.product_price_type,data.brand_loyalty,data.active_count]
  })
}
getData()
getTableData()
getRadarAvgData()
getRadarData()

</script>

<template>
  <div class="member-data">
    <div class="title-wrapper">会员发展数据</div>
    <div class="content">
      <div class="content-left">
        <v-chart class="chart" :option="option" autoresize />
        <div class="search-wrapper">
          <div class="search-input">
            <a-input
              v-model:value="userName"
              size="large"
              :bordered="false"
              placeholder="请输入会员姓名"
            >
              <template #suffix>
                <a-tooltip @click="getRadarData">
                  <SearchOutlined
                    style="color: #00a2ff; font-size: 26px; margin-right: 20px"
                  />
                </a-tooltip>
              </template>
            </a-input>
          </div>
        </div>
      </div>
      <div class="content-right">
        <Tabs :data="tab.data" @change="toggleTab" />
        <div class="progress-wrapper">
          <div class="progress-item">
            <ProgressChart className="ring-blue" :value="memberCount.newMember" />
            <h3 class="progress-title">新增会员用户</h3>
          </div>
          <div class="progress-item">
            <ProgressChart className="ring-green" :value="memberCount.cardMember" />
            <h3 class="progress-title">新增领卡会员</h3>
          </div>
          <div class="progress-item">
            <ProgressChart className="ring-yellow" :value="memberCount.salesMember" />
            <h3 class="progress-title">新增消费会员</h3>
          </div>
        </div>
        <!-- 近期新增会员列表 -->
        <div class="member-list-table">
          <h3 class="member-list-title">近期新增会员列表</h3>
          <dv-scroll-board
            :config="tableConfig"
            style="width: 743px; height: 219px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.member-data {
  margin-top: 30px;
  .title-wrapper {
    width: 100%;
    height: 60px;
    line-height: 60px;
    margin: auto;
    background: url('@/assets/images/title-big-bg.png') no-repeat;
    color: #fff;
    font-size: 28px;
    text-align: center;
    font-weight: bold;
  }
  .content {
    display: flex;
    margin-top: 20px;
    .content-left {
      position: relative;
      width: 660px;
      height: 645px;
      .search-wrapper {
        position: absolute;
        top: 50px;
        left: 0;
        height: calc(100% - 50px);
        width: 100%;
        border-radius: 8px 8px 8px 8px;
        opacity: 0.8;
        border: 1px solid #016198;
        .search-input {
          border: 1px solid #016198;
          ::v-deep(.ant-input-affix-wrapper) {
            background-color: transparent;
            .ant-input {
              background-color: transparent;
              color: #fff;
              font-size: 24px;
              height: 64px;
              line-height: 64px;
              padding: 0 20px;
              &::placeholder {
                color: #00a2ff;
              }
            }
          }
        }
      }
    }
    .content-right {
      flex: 1;
      margin-left: 53px;
      .progress-wrapper {
        display: flex;
        padding: 30px 0;
        .progress-item {
          flex: 1;
          text-align: center;
          .progress-chart {
          }
          .progress-title {
            font-size: 24px;
            color: $text-color;
            text-align: center;
            line-height: 30px;
            margin: 20px 0;
          }
        }
      }
      .member-list-table {
        .member-list-title {
          font-size: 26px;
          color: #fff;
          height: 50px;
        }
        ::v-deep(.dv-scroll-board) {
          .rows {
            border: 1px solid rgba(1, 97, 152, 0.8);
            .row-item {
              .ceil {
                text-align: center;
                font-size: 24px;
                color: $text-color;
                border-top: 1px dashed rgba(1, 97, 152, 0.8);
                border-left: 1px dashed rgba(1, 97, 152, 0.8);
                .index {
                  background-color: transparent !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
