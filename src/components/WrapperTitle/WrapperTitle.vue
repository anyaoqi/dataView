<script setup>
import titleBg from '@/assets/images/title-bg.png'
const props = defineProps(['title', 'subtitle', 'background', 'width'])
const emit = defineEmits(['click'])
const { title, subtitle, background, width } = props

const _background = background ? `url(${background})` : `url(${titleBg})`
const _width = width ? width : '100%'

const subtitleClick = () => {
  emit('click')
}
</script>

<template>
  <div class="wrapper-title">
    <span class="title-text">{{ title }}</span>
    <slot name="subtitle">
      <span class="subtitle-text" v-if="subtitle" @click="subtitleClick">
        {{ subtitle }}
      </span>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: v-bind(_width);
  height: 75px;
  padding: 0 50px 0 90px;
  background: v-bind('_background');
  background-repeat: no-repeat;
  .title-text {
    font-size: 28px;
    font-weight: bold;
    color: #fff;
  }
  .subtitle-text {
    font-size: 18px;
    color: #eee;
  }
}
</style>
