<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card>
      <div v-show="scene == 0">
        <el-button type="primary" size="default" icon="Plus" :disabled="!c3Id" @click="addSpu">添加SPU</el-button>
        <el-table :data="tableData" border stripe style="margin: 10px 0">
          <el-table-column label="序号" width="80" type="index" align="center"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="SPU操作">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" icon="Plus" title="添加SKU" @click="addSku(row)"></el-button>
              <el-button type="warning" size="small" icon="Edit" title="修改SPU" @click="updateSpu(row)"></el-button>
              <el-button type="info" size="small" icon="View" title="查看SKU列表" @click="findSku(row)"></el-button>

              <el-popconfirm :title="`你确定删除${row.spuName}吗?`" width="200px" @confirm="deleteSpu(row)">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete" title="删除SPU" @click=""></el-button>
                </template>
              </el-popconfirm>
            </template>
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
          @current-change="getHasSpu"
        />
      </div>
      <SpuForm ref="spuForm" v-show="scene == 1" @changeScene="changeScene" />
      <SkuForm ref="skuForm" v-show="scene == 2" @changeScene="changeScene" />
    </el-card>
    <el-dialog title="SKU列表" v-model="show">
      <el-table :data="skuArr" border>
        <el-table-column prop="skuName" label="SKU名字"></el-table-column>
        <el-table-column prop="price" label="SKU价格"></el-table-column>
        <el-table-column prop="weight" label="SKU重量"></el-table-column>
        <el-table-column label="SKU图片">
          <template #="{ row, $index }">
            <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" alt="" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/store/category'
import { reqHasSpu, reqSkuList, reqDeleteSpu } from '@/api/product/spu'
import type { HasSpuResponseData, Records, SpuData, SkuInfoData, SkuData } from '@/api/product/spu/type'

import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import { ElMessage } from 'element-plus'

const { c1Id, c2Id, c3Id } = storeToRefs(useCategoryStore())

const scene = ref<number>(0) // 0:显示已有SPU  1:添加或者修改已有SPU  2:添加SKU的结构

const pageNo = ref<number>(1) // 当前页码
const limit = ref<number>(5) // 每一页展示多少条数据
const total = ref<number>(0) //已有品牌总量
const tableData = ref<Records>([])

// 获取子组件实例
const spuForm = ref<any>()
const skuForm = ref<any>()

// 获取全部的sku数据
const skuArr = ref<SkuData[]>([])
const show = ref<boolean>(false)

const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  let res: HasSpuResponseData = await reqHasSpu(pageNo.value, limit.value, c3Id.value)
  if (res.code === 200) {
    tableData.value = res.data.records
    total.value = res.data.total
  }
}

const sizeChange = () => {
  getHasSpu()
}

// 添加sku按钮的回调
const addSku = (row: SpuData) => {
  scene.value = 2
  skuForm.value.initSkuData(c1Id.value, c2Id.value, row)
}

// 添加spu按钮的回调
const addSpu = () => {
  scene.value = 1
  spuForm.value.initAddSpu(c3Id.value)
}
// 修改spu
const updateSpu = (row: SpuData) => {
  scene.value = 1
  // 调用子组件实例方法获取完整已有的SPU数据
  spuForm.value.initHasSpuData(row)
}

// 子组件SpuForm绑定自定义事件：目前是让子组件通知父组件切换场景0
const changeScene = (obj: any) => {
  scene.value = obj.scene
  if (obj.params == 'update') {
    getHasSpu(pageNo.value)
  } else {
    getHasSpu()
  }
}

// 查看SKU列表的数据
const findSku = async (row: SpuData) => {
  let res: SkuInfoData = await reqSkuList(row.id as number)
  if (res.code == 200) {
    skuArr.value = res.data
    show.value = true
  }
}

// 删除spu
const deleteSpu = async (row: SpuData) => {
  let res: SkuInfoData = await reqDeleteSpu(row.id as number)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getHasSpu(tableData.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage.error('删除失败')
  }
}

watch(
  () => c3Id.value,
  () => {
    if (c3Id.value) {
      getHasSpu()
    }
  },
)

//路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeUnmount(() => {
  // 清空仓库的数据
  useCategoryStore().$reset()
})
</script>

<style lang="scss" scoped></style>
