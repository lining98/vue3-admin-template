<template>
  <div class="box">{{ msg }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('角色管理')
</script>

<style lang="scss" scoped>
.box {
  height: 400px;
  background-color: greenyellow;
}
</style>
