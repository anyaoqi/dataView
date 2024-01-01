<script setup>
import { ref, reactive } from 'vue'
import { BarsOutlined } from '@ant-design/icons-vue'
import { useDateFormat, useNow, onClickOutside } from '@vueuse/core'
import { RouterLink } from 'vue-router'

const nowDateTime = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')

const navModel = ref()
const nav = reactive({
  show: false,
  list: [
    {
      routePath: '/member',
      title: '消费运营大屏',
    },
    {
      routePath: '/integral',
      title: '积分推广大屏',
    },
    {
      routePath: '/brand',
      title: '品牌培育大屏',
    },
    {
      routePath: '/install',
      title: '安装情况大屏',
    },
  ],
})

const toggleNav = () => {
  nav.show = !nav.show
}

onClickOutside(navModel, (event) => {
  nav.show = false
  event.stopPropagation()
})
</script>

<template>
  <div class="header-container">
    <!-- 左侧 -->
    <div class="header-left">
      <!-- 菜单图标 -->
      <span class="header-item nav-wrapper" @click.stop="toggleNav">
        <BarsOutlined :style="{ fontSize: '40px', color: '#00D2FF' }" />
      </span>
      <span class="line"></span>
      <!-- logo -->
      <span class="header-item logo-wrapper">
        <img class="logo-image" src="../../assets/images/logo.png" />
      </span>
    </div>
    <!-- 中间标题 -->
    <div class="header-center">
      <slot name="title"></slot>
    </div>
    <!-- 右侧 -->
    <div class="header-right">
      <span class="header-time">{{ nowDateTime }}</span>
    </div>
  </div>
  <div v-if="nav.show" class="nav-model" ref="navModel">
    <ul class="nav-list">
      <li class="nav-item" v-for="(item, index) in nav.list" :key="index">
        <RouterLink :to="item.routePath">
          <span class="nav-item-text">{{ item.title }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  height: 137px;
  background: url('../../assets/images/header-bg.png');
  padding: 0 20px;
  .header-left {
    width: 500px;
    display: inline-flex;
    align-items: center;
    color: #00d2ff;
    .nav-wrapper {
      margin-right: 30px;
      cursor: pointer;
    }
    .line {
      width: 2px;
      height: 26px;
      background: #00d2ff;
    }
    .logo-wrapper {
      margin-left: 30px;
      .logo-image {
        width: 110px;
        height: 36px;
      }
    }
  }
  .header-center {
    flex: 1;
    text-align: center;
    .title-image {
      width: 376px;
      height: 75px;
    }
  }
  .header-right {
    width: 500px;
    display: inline-flex;
    justify-content: flex-end;
    .header-time {
      color: #00d2ff;
      font-size: 32px;
    }
  }
}
.nav-model {
  position: fixed;
  top: 100px;
  z-index: 99;
  padding: 18px;
  width: 358px;
  height: 387px;
  background: url('../../assets/images/nav-bg.png');
  .nav-list {
    list-style: none;
    margin: 0;
    padding: 20px 50px;
    background-size: 100% 100%;
    .nav-item {
      color: #fff;
      height: 80px;
      line-height: 80px;
      border-bottom: 1px dashed #00d2ff;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
      &:last-child {
        border-bottom: none;
      }
      .nav-item-text {
        color: #fff;
        font-size: 24px;
      }
    }
  }
}
</style>
