<template>
  <div>{{ msg }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const msg: string = ref("我是app根组件");
</script>

<style lang="scss" scoped></style>
