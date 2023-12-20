<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import VChart from 'vue-echarts'
import PieChartBg from './PieChartBg.vue'
import { getSalesRatio } from '@/apis/apiMember'

const chartData = reactive({
  list: [],
  cigaData: {},
})
const sum = computed(() => {
  return chartData.list.reduce((prev, curr) => (prev += curr.value), 0)
})
const dataJson = computed(() => {
  return chartData.list.reduce((prev, curr) => {
    prev[curr.name] = {
      value: curr.value,
      proportion: Number(((curr.value / sum.value) * 100).toFixed(2)),
    }
    return prev
  }, {})
})

console.log(dataJson)
const option = ref({
  color: ['#23F0FF', '#007FFD', '#00FF83', '#FFA172', '#FF6768'],
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    top: 50,
    left: 400,
    width: 400,
    itemWidth: 18, // 设置每个图例项的宽度
    itemHeight: 18, // 设置每个图例项的高度
    itemGap: 26,
    icon: 'circle',
    // selectedMode: false, // 控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭。
    textStyle: {
      color: '#00D2FF',
      fontSize: '24px',
      padding: [0, 0, 0, 10],
      rich: {
        a: {
          fontSize: '24px',
          color: '#00D2FF',
        },
        b: {
          fontSize: '24px',
          color: '#fff',
          lineHeight: 28,
        },
      },
    },
    formatter(name) {
      const value = dataJson.value[name] ? dataJson.value[name].value : ''
      const proportion = dataJson.value[name]
        ? dataJson.value[name].proportion
        : ''
      return `{a|${name}}   {b|${value}条}   {b|${proportion}%}`
    },
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['43%', '70%'],
      // radius: ['58%', '85%'],
      avoidLabelOverlap: false,
      left: '30px',
      center: ['21%', '50%'],
      itemStyle: {
        borderRadius: 0,
        borderColor: '#000',
        borderWidth: 10,
      },
      // itemStyle: {
      //   borderRadius: 0,
      //   borderColor: '#000',
      //   borderWidth: 2,
      // },
      label: {
        show: false,
        position: 'center',
      },

      emphasis: {
        scale: true,
        scaleSize: 15,
        // focus: 'self',
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: chartData.list,
    },
  ],
})

const chartRef = ref()
getSalesRatio().then(({ data, cigaData }) => {
  chartData.list = data.data
  chartData.cigaData = cigaData
  chartRef.value.setOption({
    series: {
      data: data.data,
    },
  })
  chartRef.value.chart.on('legendselectchanged', () => {})
})
const modal = reactive({
  open: false,
})
const table = reactive({
  columns: [
    {
      title: '价类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '卷烟代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '卷烟规格',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '销量（条）',
      dataIndex: 'sales',
      key: 'sales',
    },
    {
      title: '占比（%）',
      dataIndex: 'proportion',
      key: 'proportion',
    },
  ],
  data: [
    {
      key: '1',
      category: '一类烟',
      code: '13500138',
      name: '七匹狼(古田红军灰)',
      sales: '1851',
      proportion: '2.74',
    },
  ],
})

const openModal = () => {
  modal.open = true
}
const closeModal = () => {
  modal.open = false
}

const handleEvent = (param) => {
  const name = param.name
  const data = chartData.cigaData[name]
  if (data) {
    table.data = data
  } else {
    table.data = []
  }
  openModal()
  nextTick(() => {
    chartRef.value.dispatchAction({
      type: 'legendSelect',
      // 图例名称
      name: name,
    })
  })
}
</script>

<template>
  <div class="chart-wrapper">
    <PieChartBg />
    <span class="center-icon">
      <img class="vip-icon" src="@/assets/images/member2-icon.png" />
    </span>
    <v-chart
      class="chart"
      ref="chartRef"
      :option="option"
      autoresize
      @legendselectchanged="handleEvent"
    />
  </div>
  <div class="custom-modal" v-if="modal.open">
    <div class="modal-container" ref="modalContainer">
      <div class="modal-close" @click="closeModal">
        <span class="close-icon"></span>
      </div>
      <div class="modal-header">
        <span class="header-title">一类烟</span>
      </div>
      <div class="modal-content">
        <a-table
          :columns="table.columns"
          :data-source="table.data"
          :scroll="{ y: 850 }"
          size="large"
          :pagination="false"
        ></a-table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-wrapper {
  display: inline-block;
  vertical-align: top;
  width: 756px;
  height: 365px;
  margin: 20px 50px;
  padding: 5px;
  position: relative;
  .center-icon {
    position: absolute;
    top: 0;
    left: 160px;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    // justify-content: center;
    .vip-icon {
      width: 48px;
      height: 56px;
    }
  }
}
.label-wrapper {
  display: inline-block;
  vertical-align: top;
  margin-top: 50px;
  .label-item {
    font-size: 24px;
    line-height: 60px;
    &::before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
    }
    .label-name {
      color: #00d2ff;
      margin-left: 20px;
    }
    .label-num {
      color: #fff;
      margin-left: 30px;
    }
    .label-ratio {
      color: #fff;
      margin-left: 30px;
    }
  }
}

.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  .modal-container {
    position: relative;
    width: 2029px;
    height: 1174px;
    background: url('@/assets/images/modal-bg.png');
    padding: 73px 120px;
    .modal-header {
      .header-title {
        font-size: 40px;
        color: #fff;
      }
    }
    .modal-close {
      position: absolute;
      right: 63px;
      top: 58px;
      cursor: pointer;
      .close-icon {
        display: inline-block;
        width: 44px;
        height: 44px;
        background: url('@/assets/images/close.png');
        background-size: 100% 100%;
      }
    }
    .modal-content {
      padding: 40px 0;
      ::v-deep(.ant-table-wrapper) {
        .ant-table-cell {
          background-color: rgba(0, 162, 255, 0.1);
        }
        .ant-table-header {
          height: 80px;
          background-color: rgba(0, 162, 255, 0.1);
          .ant-table-cell {
            font-size: 26px;
            font-weight: bold;
            color: $text-color;
          }
        }
        .ant-table {
          background: rgba($color: #000000, $alpha: 0);
        }
        .ant-table-body {
          .ant-table-cell {
            font-size: 26px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
