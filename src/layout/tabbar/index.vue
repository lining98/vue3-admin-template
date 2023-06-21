<template>
  <div class="tabbar">
    <!-- 顶部左侧的静态 -->
    <div class="tabbar_left">
      <Breadcrumb />
    </div>
    <!-- 顶部右侧的静态 -->
    <div class="tabbar_right">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './Breadcrumb.vue'
import Setting from './Setting.vue'
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .tabbar_left {
    display: flex;
    align-items: center;
  }
}
</style>
