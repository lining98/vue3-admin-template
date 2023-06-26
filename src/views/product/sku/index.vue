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
        <template #="{ row, $index }">
          <el-button
            v-has="`btn.Sku.updown`"
            :type="row.isSale == 1 ? 'primary' : 'success'"
            size="small"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          />
          <el-button v-has="`btn.Sku.update`" type="warning" size="small" icon="Edit" @click="updateSku" />
          <el-button v-has="`btn.Sku.detail`" type="info" size="small" icon="InfoFilled" @click="findSku(row)" />
          <el-popconfirm :title="`你确定删除${row.skuName}吗?`" width="200px" @confirm="deleteSku(row)">
            <template #reference>
              <el-button v-has="`btn.Sku.remove`" type="danger" size="small" icon="Delete" title="删除SKU" @click=""></el-button>
            </template>
          </el-popconfirm>
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

    <!-- 抽屉组件 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag type="danger" style="margin: 5px" v-for="item in skuInfo.skuAttrValueList" :key="item.id">
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag type="success" style="margin: 5px" v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item">
                <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqSkuList } from '@/api/product/sku'
import { reqSaleSku, reqCancelSale, reqSkuInfo, reqRemoveSku } from '@/api/product/sku'
import type { SkuData, SkuResponseData, SkuInfoData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'

const pageNo = ref<number>(1) // 当前页码
const limit = ref<number>(10) // 每一页展示多少条数据
const total = ref<number>(0) //已有品牌总量
const tableData = ref<any>([])

// drawer
const drawer = ref<boolean>(false)
const skuInfo = ref<any>({})

const getHasSku = async (pager = 1) => {
  pageNo.value = pager
  let res: SkuResponseData = await reqSkuList(pageNo.value, limit.value)
  if (res.code == 200) {
    tableData.value = res.data.records
    total.value = res.data.total
  }
}

const sizeChange = () => {
  getHasSku()
}

// 商品上下架的操作
const updateSale = async (row: SkuData) => {
  if (row.isSale) {
    await reqCancelSale(row.id as number)
    ElMessage.success('下架成功！')
    getHasSku(pageNo.value)
  } else {
    await reqSaleSku(row.id as number)
    ElMessage.success('上架成功！')
    getHasSku(pageNo.value)
  }
}

const updateSku = () => {
  ElMessage.warning('程序员正在努力更新中...')
}

// 查看商品详情按钮的回调
const findSku = async (row: SkuData) => {
  drawer.value = true

  let res: SkuInfoData = await reqSkuInfo(row.id as number)
  skuInfo.value = res.data
}

const deleteSku = async (row: SkuData) => {
  let res: any = await reqRemoveSku(row.id as number)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getHasSku(tableData.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage.error('系统数据，不能删除')
  }
}

onMounted(getHasSku)
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
