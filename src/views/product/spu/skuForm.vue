<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('sku')
</script>

<style lang="scss" scoped></style>
