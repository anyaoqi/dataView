<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="nav-menu">
    <RouterLink to="/member"> 会员推广 </RouterLink>|
    <RouterLink to="/integral"> 积分情况</RouterLink> |
    <RouterLink to="/brand"> 品牌推广 </RouterLink>|
    <RouterLink to="/install"> 安装总数 </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.nav-menu {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
