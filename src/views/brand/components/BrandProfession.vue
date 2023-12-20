<script setup>
import {reactive, ref, toRefs} from 'vue'
import PieChart from './PieChart.vue'
import Tabs from '@/components/Tabs/Tabs.vue'
import {getProfessionData} from '@/apis/apiBrand'

const dataList = ref([])
const age_range = ref([])
const career = ref([])
const sex = ref([])
const smoker = ref([])

const getData = async () => {
  const result = await getProfessionData()
  dataList.value = result.data.data
  if (result.data.data.age_range){
    for (let i = 0; i < result.data.data.age_range.length; i++) {
      const data ={}
      data.name = result.data.data.age_range[i].name
      data.value = result.data.data.age_range[i].count
      age_range.value.push(data)
    }
  }
  if (result.data.data.career){
    for (let i = 0; i < result.data.data.career.length; i++) {
      const data ={}
      data.name = result.data.data.career[i].name
      data.value = result.data.data.career[i].count
      career.value.push(data)
    }
  }
  if (result.data.data.sex){
    for (let i = 0; i < result.data.data.sex.length; i++) {
      const data ={}
      data.name = result.data.data.sex[i].name
      data.value = Number(result.data.data.sex[i].count)
      sex.value.push(data)
    }
  }
  if (result.data.data.smoker){
    for (let i = 0; i < result.data.data.smoker.length; i++) {
      const data ={}
      data.name = result.data.data.smoker[i].name
      data.value = result.data.data.smoker[i].count
      smoker.value.push(data)
    }
  }
}

getData()

const tab = reactive({
  currentTab: {},
  list: [
    {
      id: 'one',
      name: '职业分布',
      data: career,
    },
    {
      id: 'two',
      name: '性别比',
      data: sex,
    },
    {
      id: 'three',
      name: '烟龄段',
      data: smoker,
    },
    {
      id: 'four',
      name: '年龄段',
      data: age_range,
    },
  ],
})

tab.currentTab = tab.list[0]

const toggleTab = (item) => {
  tab.currentTab = item
}

const { currentTab, list } = toRefs(tab)
</script>

<template>
  <div class="brand-profession">
    <Tabs :data="list" @change="toggleTab" />
    <div class="chart-wrapper">
      <span class="center-text">{{ currentTab.name }}</span>
      <div class="tab-content-one" v-show="currentTab.id === 'one'">
        <PieChart :data="list[0].data" :show-value="true" />
      </div>
      <div class="tab-content-two" v-show="currentTab.id === 'two'">
        <PieChart :data="list[1].data" :show-value="true" />
      </div>
      <div class="tab-content-three" v-show="currentTab.id === 'three'">
        <PieChart :data="list[2].data" :show-value="true" />
      </div>
      <div class="tab-content-four" v-show="currentTab.id === 'four'">
        <PieChart :data="list[3].data" :show-value="true" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.brand-profession {
  margin-top: 10px;
  .chart-wrapper {
    position: relative;
    .center-text {
      position: absolute;
      left: 110px;
      top: 132px;
      color: #fff;
      font-size: 26px;
    }
  }
}
</style>
