<script setup>
import { reactive, ref } from 'vue'
import { getSranking } from '@/apis/apiMember'

const tableRef = ref()
const config = reactive({
  headerHeight: 52,
  header: [],
  data: [],
  headerBGC: 'rgba(0, 162, 255, 0.1)',
  oddRowBGC: 'rgba(0, 162, 255, 0.05)',
  evenRowBGC: 'rgba(0, 162, 255, 0.05)',
  index: true,
  indexHeader: '排名',
  columnWidth: [80, 150, 280],
  align: ['center'],
})

const mouseoverHandler = (e) => {
  console.log(e)
}

const clickHandler = (e) => {
  console.log(e)
}

getSranking().then(({ data }) => {
  console.log(data)
  if (data && data.list) {
    config.data = data.list
    config.header = data.column
  }
})
</script>

<template>
  <div class="table-wrapper">
    <dv-scroll-board
      :config="config"
      style="width: 100%; height: 320px"
      ref="tableRef"
      @mouseover="mouseoverHandler"
      @click="clickHandler"
    />
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  padding: 20px 0 0 20px;
  ::v-deep(.dv-scroll-board) {
    .header {
      .header-item {
        color: $text-color;
        font-size: 18px;
      }
    }
    .rows {
      .row-item {
        &:nth-of-type(1),
        &:nth-of-type(2),
        &:nth-of-type(3) {
          .ceil {
            .index {
              background: url('@/assets/images/number-arrow-yellow.png');
            }
          }
        }
        .ceil {
          color: $text-color;
          font-size: 18px;
          .index {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 26px;
            background: url('@/assets/images/number-arrow.png');
            color: #111927;
          }
          &:nth-of-type(4) {
            color: #ff9444;
          }
          &:nth-of-type(5) {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
