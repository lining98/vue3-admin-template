<template>
  <div class="box">{{ msg }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('用户管理')
</script>

<style lang="scss" scoped>
.box {
  height: 400px;
  background-color: yellowgreen;
}
</style>
