<template>
  <div class="center">
    <Map />
    <Line />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Map from './Map.vue'
import Line from './Line.vue'

const msg = ref('center')
</script>

<style lang="scss" scoped>
.center {
  flex: 2;
  display: flex;
  flex-direction: column;
}
</style>
