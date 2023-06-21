<template>
  <div class="setting">
    <el-button icon="Refresh" @click="refresh = !refresh" circle />
    <el-button icon="FullScreen" @click="fullScreen" circle />
    <el-popover placement="bottom" title="主题设置" :width="200" trigger="hover">
      <!-- 表单元素 -->
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker @change="setColor" v-model="color" size="small" show-alpha :predefine="predefineColors" />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            @change="changeDark"
            v-model="dark"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            active-icon="MoonNight"
            inactive-icon="Sunny"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button icon="Setting" circle />
      </template>
    </el-popover>

    <img :src="avatar" style="width: 24px; height: 24px; border-radius: 50%" alt="" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSettingStore } from '@/store/setting'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
const { refresh } = storeToRefs(useSettingStore())

const { username, avatar } = storeToRefs(useUserStore())
const { userLogout } = useUserStore()
const route = useRoute()
const router = useRouter()

const dark = ref<boolean>(false)

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

// 全屏按钮点击的回调
const fullScreen = () => {
  // DOM对象的一个属性：可以判断当前是不是全屏模式
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

//主题颜色的设置
const setColor = () => {
  //通知js修改根节点的样式对象的属性与属性值
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
//switch开关的chang事件进行暗黑模式的切换
const changeDark = () => {
  //获取HTML根节点
  let html = document.documentElement
  //判断HTML标签是否有类名dark
  dark.value ? (html.className = 'dark') : (html.className = '')
}

const logout = async () => {
  await userLogout()
  router.push({ path: '/login', query: { redirect: route.path } })
}
</script>

<style lang="scss" scoped>
.setting {
  display: flex;
  align-items: center;
  img {
    margin: 0 10px 0 25px;
  }
}
</style>
