<script setup>
import { reactive } from 'vue'
const props = defineProps(['config', 'width', 'height'])

const config = props.config || {}
const tableConfig = reactive({
  index: true,
  rowNum: 6,
  headerHeight: 40,
  columnWidth: [60],
  align: ['center'],
  indexHeader: '序号',
  headerBGC: 'rgba(0, 162, 255, 0.1)',
  oddRowBGC: 'rgba(0, 162, 255, 0.05)',
  evenRowBGC: 'rgba(0, 162, 255, 0.05)',
  ...config,
})

const width = props.width || '100%'
const height = props.height || '260px'
</script>

<template>
  <div class="table-scroll-wrapper">
    <dv-scroll-board
      :config="tableConfig"
      :style="{ width: width, height: height }"
    />
  </div>
</template>

<style lang="scss" scoped>
.table-scroll-wrapper {
  ::v-deep(.dv-scroll-board) {
    .header {
      font-size: 16px;
      color: $text-color;
    }
    .rows .row-item {
      .ceil {
        font-size: 16px;
        .index {
          color: $text-color;
        }
      }
    }
  }
}
</style>
