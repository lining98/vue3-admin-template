<template>
  <div class="logo">
    <img :src="logo" alt="" />
    <p>{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
const {title,logo} = setting
</script>

<style lang="scss" scoped>
.logo{
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    align-items: center;
    padding-left: 20px;
    img{
        margin-right: 10px;
    }
}
</style>
