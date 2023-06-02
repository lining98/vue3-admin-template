<template>
  <div class="box">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('我是app根组件')

const fun = () => {
  console.log('222')
}
fun()
</script>

<style lang="scss" scoped>
.box {
  width: 600px;
  height: 400px;
  background: #000;
  h1 {
    color: #fff;
  }
}
</style>
