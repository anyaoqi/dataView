<script setup>
import { reactive, toRefs } from 'vue'

const props = defineProps(['percent', 'value', 'className'])

const { value } = toRefs(props)
const progress = reactive({
  percent: props.percent,
  className: props.className,
  value: props.value,
})

const strokeColor = {
  'ring-blue': {
    '0%': '#00FDF2',
    '100%': '#00CDFF',
  },
  'ring-green': {
    '0%': '#0AFF7F',
    '100%': '#ACFFD3',
  },
  'ring-yellow': {
    '0%': '#FFA800',
    '100%': '#FCD592',
  },
}[progress.className]
</script>

<template>
  <div class="progress-chart" :class="progress.className">
    <span class="chart-bg"></span>
    <a-progress
      type="circle"
      :percent="75"
      :stroke-color="strokeColor"
      :size="[200, 200]"
      :strokeWidth="4"
    >
      <template #format="percent">
        <span class="progress-text-num">{{ value }}</span>
        <br />
        <span v-if="percent" class="progress-text-txt"></span>
      </template>
    </a-progress>
  </div>
</template>

<style lang="scss" scoped>
@keyframes rotate360 {
  0% {
    transform: rotate(0deg) scale(0.8);
    opacity: 0.5;
  }

  100% {
    transform: rotate(360deg) scale(1);
    opacity: 1;
  }
}

.progress-chart {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  .chart-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 167px 167px;
    transition: all 0.5s;
    animation: rotate360 5s infinite alternate-reverse;
  }
  &.ring-blue {
    .chart-bg {
      background-image: url('@/assets/images/brand/ring-blue.png');
    }
  }
  &.ring-green {
    .chart-bg {
      background-image: url('@/assets/images/brand/ring-green.png');
    }
  }
  &.ring-yellow {
    .chart-bg {
      background-image: url('@/assets/images/brand/ring-yellow.png');
    }
  }
  .progress-text-num {
    font-size: 36px;
    color: #fff;
  }
  .progress-text-txt {
    color: #00d2ff;
    font-size: 22px;
  }
}
</style>
