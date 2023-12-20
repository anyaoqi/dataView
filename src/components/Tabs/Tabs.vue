<script setup>
import { reactive } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['change'])

// Tab数据
const tab = reactive({
  currentTab: props.data[0],
  list: props.data,
})

// 切换Tab
const toggleTab = (item) => {
  tab.currentTab = item
  emit('change', item)
}
</script>

<template>
  <div class="tabs-wrapper">
    <div class="tab-wrapper">
      <span class="tab-current-bg"></span>
      <ul class="tab-list">
        <li
          v-for="item in tab.list"
          :key="item.id"
          class="tab-item"
          :class="{ 'checked': item.id === tab.currentTab.id }"
          @click="toggleTab(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-wrapper {
  position: relative;
  width: 100%;
  height: 56px;
  line-height: 56px;
  border-radius: 28px;
  border: 1px solid rgba(0, 162, 255, 0.4);
  .tab-current-bg {
    position: absolute;
    top: 0;
    left: 0;
  }
  .tab-list {
    display: flex;
    .tab-item {
      color: $text-color;
      font-size: 24px;
      flex: 1;
      text-align: center;
      cursor: pointer;
      &:first-child {
        border-top-left-radius: 28px;
        border-bottom-left-radius: 28px;
      }
      &:last-child {
        border-top-right-radius: 28px;
        border-bottom-right-radius: 28px;
      }
      &.checked {
        color: #fff;
        background: rgba(0, 162, 255, 0.4);
      }
    }
  }
}
</style>
