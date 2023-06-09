<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button type="primary" icon="Plus" @click="addTradeMark">
        添加品牌
      </el-button>
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
          <template #="{ row, index }">
            <el-button
              type="primary"
              icon="Edit"
              @click="updateTradeMark(row)"
            />
            <el-popconfirm
              :title="`您确定要删除${row.tmName}吗？`"
              icon="Delete"
              width="200px"
              @confirm="deleteTradeMark(row.id)"
            >
              <template #reference>
                <el-button type="danger" icon="Delete" />
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
        @current-change="getHasTradeMark"
      />
    </el-card>

    <!-- 添加、修改 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
        style="width: 80%"
        label-width="100px"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            v-model.trim="trademarkParams.tmName"
            placeholder="请您输入品牌名称"
          />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  reqHasTradeMark,
  reqAddOrUpdateTradeMark,
  reqDeleteTradeMark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import { ElMessage, UploadProps } from 'element-plus'

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
  getHasTradeMark()
}

const formRef = ref()
const dialogFormVisible = ref(false)
const trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})

// 表单校验
const rules = {
  tmName: [
    {
      required: true,
      min: 2,
      message: '品牌名称位数大于等于两位',
      trigger: 'blur',
    },
  ],
  logoUrl: [{ required: true, message: '请选择品牌logo', trigger: 'change' }],
}
const showModal = () => {
  formRef.value?.clearValidate()
  dialogFormVisible.value = true
}
const addTradeMark = () => {
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  showModal()
}
const updateTradeMark = (row: TradeMark) => {
  showModal()
  Object.assign(trademarkParams, row)
}
const deleteTradeMark = async(id: number) => {
  let res = await reqDeleteTradeMark(id)
  if(res.code === 200){
    ElMessage.success('删除品牌成功')
    getHasTradeMark(tableData.value.length>1?pageNo.value:pageNo.value-1)
  }else{
    ElMessage.error('删除品牌失败')
  }
}

const confirm = async () => {
  // 再发请求之前，要对于整个表单校验
  await formRef.value.validate()

  let res: any = await reqAddOrUpdateTradeMark(trademarkParams)
  if (res.code === 200) {
    ElMessage.success(trademarkParams.id ? '修改品牌成功！' : '添加品牌成功！')
    dialogFormVisible.value = false
    getHasTradeMark(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage.error(trademarkParams.id ? '修改品牌失败！' : '添加品牌成功！')
    dialogFormVisible.value = false
  }
}

// 图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  // trademarkParams.logoUrl = response.data
  trademarkParams.logoUrl = URL.createObjectURL(uploadFile.raw!)
  // 图片上传成功，清除掉对应图片校验信息
  formRef.value.clearValidate('logoUrl')
}

// 上传图片组件之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/git'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('上传文件大小应小于4M')
    }
  } else {
    ElMessage.error('上传文件格式务必为PNG|JPG|GIF')
    return false
  }
}

onMounted(() => {
  getHasTradeMark()
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
