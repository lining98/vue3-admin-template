<template>
  <div>
    <Category :scene="scene" />
    <el-card>
      <div v-show="scene == 0">
        <el-button type="primary" size="default" icon="Plus" :disabled="!c3Id" @click="addAttr">添加属性</el-button>
        <el-table :data="dataAttr" border style="margin: 10px 0">
          <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
          <el-table-column label="属性名称" prop="attrName" width="150"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag style="margin: 5px" v-for="item in row.attrValueList" :key="item.id">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="" width="150">
            <template #="{ row, $index }">
              <el-button type="warning" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
              <el-popconfirm :title="`你确定删除${row.attrName}?`" width="200px" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <!-- 展示添加属性与修改数据的结构 -->
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input placeholder="请你输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="default" :disabled="!attrParams.attrName" @click="addAttrValue">添加属性值</el-button>
        <el-button type="primary" size="default" @click="scene = 0">取消</el-button>
        <el-table border :data="attrParams.attrValueList" style="margin: 10px 0">
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column label="属性值">
            <template #="{ row, $index }">
              <el-input
                :ref="(vc:any)=>inputArr[$index] = vc"
                v-if="row.flag"
                size="small"
                placeholder="请你输入属性值名称"
                v-model="row.valueName"
                @blur="toLook(row, $index)"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button type="danger" size="small" icon="Delete" @click="attrParams.attrValueList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" size="default" @click="save" :disabled="attrParams.attrValueList.length == 0">保存</el-button>
        <el-button type="primary" size="default" @click="scene = 0">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref, watch, onBeforeUnmount } from 'vue'
import { useCategoryStore } from '@/store/category'
import { storeToRefs } from 'pinia'
import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from '@/api/product/attr'
import { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'

const { c1Id, c2Id, c3Id } = storeToRefs(useCategoryStore())

const dataAttr = ref<Attr[]>([])

// 定义card组件内容切换变量
const scene = ref<number>(0)
// 收集新增的属性的数据
const attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})

// 准备一个数组：用来存储对应的组件实例el-input
const inputArr = ref<any>([])

// 获取已有的属性与属性值方法
const getAttr = async () => {
  let res: AttrResponseData = await reqAttr(c1Id.value, c2Id.value, c3Id.value)
  if (res.code === 200) {
    dataAttr.value = res.data
  }
}

// 添加属性按钮的回调
const addAttr = () => {
  // 清空数据
  Object.assign(attrParams, {
    id: '',
    attrName: '',
    attrValueList: [],
    categoryId: c3Id.value,
    categoryLevel: 3,
  })
  scene.value = 1
  // 点击这个按钮的时候收集新增属性的三级分类的ID
}

// 修改
const updateAttr = (row: Attr) => {
  scene.value = 1
  // 将已有的属性对象赋值给attrParams对象
  // 对象合并
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

// 添加属性值按钮的回调
const addAttrValue = () => {
  // 点击添加属性值按钮的时候，向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  // 获取最后el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

// 保存按钮的回调
const save = async () => {
  // 发请求
  let res: any = await reqAddOrUpdateAttr(attrParams)
  if (res.code === 200) {
    // 切换场景
    scene.value = 0
    // 提示信息
    ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
    // 获取全部已有的属性与属性值
    getAttr()
  } else {
    ElMessage.error(attrParams.id ? '修改失败' : '添加失败')
  }
}

const toLook = (row: AttrValue, $index: number) => {
  // 不能为空
  if (row.valueName.trim() == '') {
    // 删除调用对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    ElMessage.error('属性值不能为空')
    return
  }
  // 不能重复命名
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    ElMessage.error('属性值不能重复')
    attrParams.attrValueList.splice($index, 1)
    return
  }

  row.flag = false
}
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

// 删除某一个已有的属性方法回调
const deleteAttr = async (attrId: number) => {
  let res: any = await reqRemoveAttr(attrId)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getAttr()
  }
}

//路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeUnmount(() => {
  // 清空仓库的数据
  useCategoryStore().$reset()
})

watch(
  () => c3Id.value,
  () => {
    dataAttr.value = []
    if (!c3Id.value) return
    getAttr()
  },
)
</script>

<style lang="scss" scoped></style>
