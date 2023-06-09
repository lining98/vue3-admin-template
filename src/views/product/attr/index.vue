<template>
  <div>
    <Category />
    <el-card>
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!c3Id"
        @click=""
      >
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column label="属性名称" width="150"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作" width="150"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/store/category'
import { storeToRefs } from 'pinia'
const { c3Id } = storeToRefs(useCategoryStore())
</script>

<style lang="scss" scoped></style>
