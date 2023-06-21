<template>
  <el-form ref="form" label-width="100px" :inline="false">
    <el-form-item label="SPU名称">
      <el-input v-model="spuParams.spuName" placeholder="请你输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId" clearable filterable @change="">
        <el-option v-for="item in allTradeMark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input v-model="spuParams.description" type="textarea" placeholder="请你输入SPU描述"></el-input>
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
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="saleAttrIdAndValueName"
        clearable
        :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '无'"
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!saleAttrIdAndValueName"
        @click="addSaleAttr"
      >
        添加属性
      </el-button>
      <el-table :data="saleAttr" style="margin: 10px 0" border stripe>
        <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
        <el-table-column label="销售属性名" prop="saleAttrName" width="120"></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row, index }">
            <el-tag
              v-for="tag in row.spuSaleAttrValueList"
              :key="tag.id"
              style="margin: 0 5px"
              closable
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              v-model="row.saleAttrValue"
              :ref="(vc:any)=>inputArr[index] = vc"
              v-if="row.flag"
              style="width: 100px"
              placeholder="请你输入属性值"
              size="small"
              clearable
              @blur="toLook(row)"
            ></el-input>
            <el-button v-else type="primary" size="small" icon="Plus" @click="toEdit(row, index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #="{ row, index }">
            <el-button type="danger" size="small" icon="Delete" @click="saleAttr.splice(index, 1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button :disabled="saleAttr.length > 0 ? false : true" type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { reqAllTradeMark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr, reqAddOrUpdateSpu } from '@/api/product/spu'
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
  SaleAttrValue,
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
  spuSaleAttrList: [],
})
//控制对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
//存储预览图片地址
const dialogImageUrl = ref<string>('')

// 收集还未选择的销售属性的ID与属性值的名字
const saleAttrIdAndValueName = ref<string>('')

const cancel = () => {
  $emit('changeScene', { scene: 0, params: 'update' })
}

// 准备一个数组：用来存储对应的组件实例el-input
const inputArr = ref<any>([])

//照片墙点击预览按钮的时候触发的钩子
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
//照片墙删除文件钩子
const handleRemove = () => {}
//照片钱上传成功之前的钩子约束文件的大小与类型
const handlerUpload = (file: any) => {
  if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
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

// 计算出当前SPU还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  const unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((ite) => {
      return item.name != ite.saleAttrName
    })
  })
  return unSelectArr
})

// 添加销售属性的方法
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  // 准备一个新的销售属性对象：将来带给服务器
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  // 追加到数组当中
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAndValueName.value = ''
}

// 添加属性按钮的回调
const toEdit = (row: SaleAttr, index: number) => {
  row.flag = true
  row.saleAttrValue = ''
  nextTick(() => {
    inputArr.value[index].focus()
  })
}

// 表单元素失焦回调
const toLook = (row: SaleAttr) => {
  // 整理收集的属性的ID与属性值的名字
  const { baseSaleAttrId, saleAttrValue } = row
  const newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }
  if (saleAttrValue?.trim() == '') {
    ElMessage.error('属性值不能为空')
    return
  }
  // 判断属性值是否在数组当中存在
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })
  if (repeat) {
    ElMessage.error('属性值不能重复')
    return
  }

  // 追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
}

// 保存按钮的回调
const save = async () => {
  // 整理参数
  spuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  spuParams.value.spuSaleAttrList = saleAttr.value

  // 发请求 添加|修改SPU
  let res = await reqAddOrUpdateSpu(spuParams.value)
  if (res.code === 200) {
    ElMessage.success(spuParams.value.id ? '修改成功' : '添加成功')
    $emit('changeScene', {
      scene: 0,
      params: spuParams.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage.error(spuParams.value.id ? '修改失败' : '添加失败')
  }
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

// 添加一个新的SPU初始化请求方法
const initAddSpu = async (c3Id: number | string) => {
  // 清空数据
  saleAttrIdAndValueName.value = ''
  Object.assign(spuParams.value, {
    id: '',
    spuName: '',
    description: '',
    category3Id: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
  })
  // 清空照片
  imgList.value = []
  // 清空销售属性
  saleAttr.value = []
  // 存储三级分类的ID
  spuParams.value.category3Id = c3Id
  let res: AllTradeMark = await reqAllTradeMark()
  let res1: HasSaleAttrResponseData = await reqAllSaleAttr()
  allTradeMark.value = res.data
  allSaleAttr.value = res1.data
}

// 对外暴露
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style lang="scss" scoped></style>
