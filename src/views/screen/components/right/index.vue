<template>
  <div class="right">
    <Rank />
    <Year />
    <Couter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Rank from './Rank.vue'
import Year from './Year.vue'
import Couter from './Couter.vue'
</script>

<style lang="scss" scoped>
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  div:nth-child(1) {
    flex: 1.5;
    padding: 0 15px;
  }
  div:nth-child(2),
  div:nth-child(3) {
    flex: 1;
    padding: 0 15px;
  }
}
</style>
