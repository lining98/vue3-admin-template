<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%; margin: 10px 0"
      border
    >
      <el-table-column
        label="序号"
        width="80"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #default="scope">
          <img
            style="width: 100px; height: 100px"
            :src="scope.row.logoUrl"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" icon="Edit" />
        <el-button type="danger" icon="Delete" />
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[5, 10, 15, 20]"
      background
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @size-change="sizeChange"
      @current-change="getHasTradeMark"
    />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqHasTradeMark } from '@/api/product/trademark'
import { Records, TradeMarkResponseData } from '@/api/product/trademark/type'

const pageNo = ref<number>(1) // 当前页码
const limit = ref<number>(5) // 每一页展示多少条数据
const total = ref<number>(0) //已有品牌总量
const tableData = ref<Records>([])

const loading = ref<boolean>(false)

const getHasTradeMark = async (pager = 1) => {
  pageNo.value = pager
  loading.value = true
  const res: TradeMarkResponseData = await reqHasTradeMark(
    pageNo.value,
    limit.value,
  )
  if (res.code === 200) {
    total.value = res.data.total
    tableData.value = res.data.records
    loading.value = false
  }
}
const sizeChange = () => {
    //当前每一页的数据量发生变化的时候，当前页码归1
    getHasTradeMark();
}

onMounted(() => {
  getHasTradeMark()
})
</script>

<style lang="scss" scoped></style>
