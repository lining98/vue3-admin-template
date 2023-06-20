<template>
  <el-card style="margin-bottom: 15px">
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select v-model="c1Id" @change="handler" :disabled="scene !== 0">
          <el-option
            v-for="c1 in c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="c2Id" @change="handler2" :disabled="scene !== 0">
          <el-option
            v-for="c2 in c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="c3Id" :disabled="scene !== 0">
          <el-option
            v-for="c3 in c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryStore } from '@/store/category'
import { storeToRefs } from 'pinia'

defineProps(['scene'])

const { c1Id, c2Id, c3Id, c1Arr, c2Arr, c3Arr } = storeToRefs(
  useCategoryStore(),
)
const { getC1, getC2, getC3 } = useCategoryStore()

// 一级分类的change事件
const handler = (val: number) => {
  // 通知仓库获取二级分类的方法
  getC2()
  c2Id.value = ''
  c3Id.value = ''
  c2Arr.value = []
}
// 二级分类的change事件
const handler2 = (val: number) => {
  // 通知仓库获取三级分类的方法
  getC3()
  c3Id.value = ''
}

onMounted(() => {
  getC1()
})
</script>

<style lang="scss" scoped></style>
