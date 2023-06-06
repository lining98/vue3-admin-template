<template>
  <el-icon class="icon" @click="fold = !fold">
    <component :is="fold ? 'Fold' : 'Expand'" />
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="item in route.matched"
      :key="item.name"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon style="vertical-align: top">
        <component :is="item.meta.icon" />
      </el-icon>
      <!-- 标题 -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/setting'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const { fold } = storeToRefs(useSettingStore())
const route = useRoute()
</script>

<style lang="scss" scoped>
.icon {
  margin-right: 10px;
  cursor: pointer;
}
</style>
