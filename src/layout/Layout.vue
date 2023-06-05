<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo />
      <el-scrollbar class="scrollbar">
        <el-menu background-color="#001529" text-color="#ccc">
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 右侧部分 -->
    <div class="layout_right">
      <!-- 顶部导航 -->
      <div class="layout_tabbar">top</div>
      <!-- 内容展示区域 -->
      <div class="layout_main">
        <Main></Main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 获取用户相关的小仓库
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
// 引入组件
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'

const { menuRoutes } = storeToRefs(useUserStore())
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  display: flex;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    color: #ccc;
    display: flex;
    flex-direction: column;
    .scrollbar {
      flex: 1;
      width: 100%;
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .layout_tabbar {
      width: 100%;
      height: $base-tabbar-height;
      background-color: yellowgreen;
    }
    .layout_main {
      flex: 1;
      padding: 20px;
      overflow: auto;
    }
  }
}
</style>
