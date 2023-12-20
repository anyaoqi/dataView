<script setup>
import { reactive, ref } from 'vue'
import { getProvinceCount } from '@/apis/apiBrand'
const dataList = ref([])

const getData = async () => {
  const result = await getProvinceCount()
  const list = result.data.data
  for (let i = 0; i < list.length; i++) {
    const d = list[i]
    const percent = (Number(d.provinceCount) / Number(d.total)) * 100
    const data = [
      d.province,
      d.provinceCount,
      `<div class="progress" > <span style="width: ${percent}%" class="progress-line"></span> </div>`,
      `${percent.toFixed(2)}%`,
    ]
    dataList.value.push(data)
  }
}
getData()

const config = reactive({
  header: ['籍贯', '会员数量', '　', '会员占比'],
  data: dataList.value,
  index: true,
  columnWidth: [50, 100, 150, 280, 100],
  align: ['center'],
  rowNum: 3,
  indexHeader: '',
  headerBGC: 'rgba(0, 127, 253, 0.1)',
  oddRowBGC: 'rgba(0,0,0,0)',
  evenRowBGC: 'rgba(0,0,0,0)',
})

const mouseoverHandler = (e) => {
  console.log(e)
}

const clickHandler = (e) => {
  console.log(e)
}
</script>

<template>
  <div class="brand-distribution">
    <h5 class="box-title">籍贯分布</h5>
    <div class="scroll-table">
      <dv-scroll-board
        :config="config"
        style="width: 100%; height: 220px"
        @mouseover="mouseoverHandler"
        @click="clickHandler"
        class="table-scroll-board"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.brand-distribution {
  padding: 30px;
  box-sizing: border-box;
  width: 746px;
  .box-title {
    color: #fff;
    height: 50px;
    font-size: 26px;
    letter-spacing: 2px;
  }
  .scroll-table {
    ::v-deep(.dv-scroll-board) {
      .header {
        .header-item {
          font-size: 20px;
          color: #00d2ff;
        }
      }
      .rows {
        .row-item {
          transition: all 0.3s;
          .progress {
            position: relative;
            width: 100%;
            height: 14px;
            border-radius: 2px;
            background: rgba(0, 101, 253, 0.2);
            margin-top: 25px;
            .progress-line {
              position: absolute;
              left: 0;
              top: 0;
              height: 14px;
              border-radius: 4px;
              background: linear-gradient(#00ff83, #03de9e);
            }
          }
        }
        .ceil {
          font-size: 24px;
        }
      }
    }
  }
}
.table-scroll-board {
}
</style>
