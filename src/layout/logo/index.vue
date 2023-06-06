<template>
  <div class="logo">
    <img :src="logo" alt="" />
    <p>{{ fold ? '' : title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import { useSettingStore } from '@/store/setting'
import { storeToRefs } from 'pinia'
const { title, logo } = setting
const { fold } = storeToRefs(useSettingStore())
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding-left: 10px;
  img {
    margin-right: 10px;
  }
}
</style>
