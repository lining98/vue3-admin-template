<template>
  <el-form ref="form" label-width="100px" :inline="false">
    <el-form-item label="SPU名称">
      <el-input
        v-model="spuParams.spuName"
        placeholder="请你输入SPU名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId" clearable filterable @change="">
        <el-option
          v-for="item in allTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        v-model="spuParams.description"
        type="textarea"
        placeholder="请你输入SPU描述"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select clearable filterable @change="">
        <el-option
          v-for="item in allSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        size="default"
        icon="Plus"
        @click=""
      ></el-button>
      <el-table :data="saleAttr" style="margin: 10px 0" border stripe>
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          label="销售属性名"
          prop="saleAttrName"
          width="120"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row }">
            <el-tag
              v-for="tag in row.spuSaleAttrValueList"
              :key="tag.id"
              style="margin: 0 5px"
              closable
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-button
              type="primary"
              size="small"
              icon="Plus"
              @click=""
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #="{ row }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click=""
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
} from '@/api/product/spu'
import type {
  AllTradeMark,
  HasSaleAttrResponseData,
  SaleAttrResponseData,
  SpuData,
  SpuHasImg,
  SpuImg,
  TradeMark,
  SaleAttr,
  HasSaleAttr,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'

let $emit = defineEmits(['changeScene'])

// 存储已有的SPU这些数据
const allTradeMark = ref<TradeMark[]>([])
const imgList = ref<SpuImg[]>([])
const saleAttr = ref<SaleAttr[]>([])
const allSaleAttr = ref<HasSaleAttr[]>([])

// 存储已有的SPU对象
const spuParams = ref<SpuData>({
  spuName: '',
  description: '',
  category3Id: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [
    // {
    //   id: '',
    //   createTime: null,
    //   updateTime: null,
    //   spuId: '',
    //   baseSaleAttrId: 0,
    //   saleAttrName: '',
    //   spuSaleAttrValueList: [],
    // },
  ],
})
//控制对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
//存储预览图片地址
const dialogImageUrl = ref<string>('')

const cancel = () => {
  $emit('changeScene', 0)
}

const initHasSpuData = async (spu: SpuData) => {
  // 存储已有的SPU对象，在模版中展示
  spuParams.value = spu
  // spu:即为父组件传递过来的已有的SPU对象
  // 获取全部品牌的数据
  let res: AllTradeMark = await reqAllTradeMark()
  // 获取某一个品牌旗下全部售卖商品的图片
  let res1: SpuHasImg = await reqSpuImageList(spu.id as number)
  // 获取已有的SPU销售属性的数据
  let res2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  // 获取整个项目全部SPU的销售属性
  let res3: HasSaleAttrResponseData = await reqAllSaleAttr()

  // 存储全部品牌的数据
  allTradeMark.value = res.data
  imgList.value = res1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  saleAttr.value = res2.data
  allSaleAttr.value = res3.data
}

//照片墙点击预览按钮的时候触发的钩子
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
//照片墙删除文件钩子
const handleRemove = () => {}
//照片钱上传成功之前的钩子约束文件的大小与类型
const handlerUpload = (file: any) => {
  if (
    file.type == 'image/png' ||
    file.type == 'image/jpeg' ||
    file.type == 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage.error('上传文件务必小于3M')
      return false
    }
  } else {
    ElMessage.error('上传文件务必PNG|JPG|GIF')
    return false
  }
}

// 对外暴露
defineExpose({ initHasSpuData })
</script>

<style lang="scss" scoped></style>
