<template>
  <div class="right">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('righttttttt')
</script>

<style lang="scss" scoped>
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
