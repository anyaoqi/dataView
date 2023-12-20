<script setup>
import {ref, reactive, watch, onMounted} from 'vue'

const props = defineProps(['data','showValue'])

const pie = reactive({
  data: props.data,
  showValue : props.showValue || false
})


watch(pie.data,(newValue) => {
  if (newValue) {
    sum = pie.data.reduce((prev, curr) => {
      prev += curr.value
      return prev
    }, 0)
  }
})


let sum = pie.data.reduce((prev, curr) => {
  prev += curr.value
  return prev
}, 0)


const option = ref({
  tooltip: {
    show: false,
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 330,
    width: 400,
    itemWidth: 18, // 设置每个图例项的宽度
    itemHeight: 18, // 设置每个图例项的高度
    itemGap: 18,
    type: 'scroll',
    orient: 'vertical',
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
      const value = pie.data.find((item) => item.name === name).value
      let v = Number((value / sum).toFixed(2)) * 100
      if (pie.showValue){
        v = value
      }
      return `{a|${name}}: {b|${v}}`
      // return `${name}: ${v}%`
    },
  },
  color: [
    '#0096FF',
    '#00DEFF',
    '#3EFFE6',
    '#03DE9E',
    '#ADF25C',
    '#F2C95C',
    '#F2915C',
    '#F25C5C',
    '#7B42FB',
    '#4C43FB',
    '#006CFF',
  ],
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['58%', '85%'],
      avoidLabelOverlap: false,
      left: '0%',
      center: ['21%', '50%'],
      itemStyle: {
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 10,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: false,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: pie.data,
    },
  ],
})
</script>

<template>
  <div class="pie-chart-wrapper">
    <div class="chart-left">
      <v-chart class="chart" :option="option" autoresize />
    </div>
    <div class="chart-right"></div>
  </div>
</template>

<style lang="scss" scoped>
.pie-chart-wrapper {
  margin-top: 30px;
  .chart-left {
    width: 100%;
    height: 300px;
    background: url('../../../assets/images/piechart-bg.png') no-repeat;
  }
}
</style>
