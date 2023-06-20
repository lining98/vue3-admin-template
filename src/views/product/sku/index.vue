<template>
  <el-card>
    <el-table :data="tableData" border style="margin: 10px 0" height="calc(100vh - 180px)">
      <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称" width="250"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="450"></el-table-column>
      <el-table-column label="默认图片" width="350">
        <template #="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 120px; height: 120px" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(g)" width="150"></el-table-column>
      <el-table-column prop="price" label="价格(元)" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template #default>
          <el-button type="success" size="small" icon="Top" @click="" />
          <el-button type="primary" size="small" icon="Bottom" @click="" />
          <el-button type="warning" size="small" icon="Edit" @click="" />
          <el-button type="info" size="small" icon="InfoFilled" @click="" />
          <el-button type="danger" size="small" icon="Delete" @click="" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[10, 20, 50, 100]"
      background
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @size-change="sizeChange"
      @current-change="getHasSku"
    />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqSkuList } from '@/api/product/sku'
import { SkuData, SkuResponseData } from '@/api/product/sku/type'

const pageNo = ref<number>(1) // 当前页码
const limit = ref<number>(10) // 每一页展示多少条数据
const total = ref<number>(0) //已有品牌总量
const tableData = ref<any>([])

const getHasSku = async (pager = 1) => {
  pageNo.value = pager
  let res: SkuResponseData = await reqSkuList(pageNo.value, limit.value)
  console.log(res)
  if (res.code == 200) {
    tableData.value = res.data.records
    total.value = res.data.total
  }
}

const sizeChange = () => {
  getHasSku()
}

onMounted(getHasSku)
</script>

<style lang="scss" scoped></style>
