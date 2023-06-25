<template>
  <div class="left">
    <Tourist />
    <Sex />
    <Age />
  </div>
</template>

<script setup lang="ts">
import Tourist from './Tourist.vue'
import Sex from './Sex.vue'
import Age from './Age.vue'
</script>

<style lang="scss" scoped>
.left {
  flex: 1;
  height: 1040px;
  display: flex;
  flex-direction: column;
  div:nth-child(1) {
    flex: 1.2;
    padding: 0 15px;
  }
  div:nth-child(2),
  div:nth-child(3) {
    flex: 1;
    padding: 0 15px;
  }
}
</style>
