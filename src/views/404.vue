<template>
  <div class="err">
    <img src="../assets/images/error_images/404.png" alt="" />
    <br />
    <el-button class="btn" link type="primary" size="default" @click="router.push('/')">回到首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped>
.err {
  text-align: center;
  .btn {
    font-size: 30px;
  }
}
</style>
