<template>
  <div class="setting">
    <el-button icon="Refresh" @click="refresh = !refresh" circle />
    <el-button icon="FullScreen" @click="fullScreen" circle />
    <el-button icon="Setting" circle />
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
import { useSettingStore } from '@/store/setting'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
const { refresh } = storeToRefs(useSettingStore())

const { username, avatar } = storeToRefs(useUserStore())
const { userLogout } = useUserStore()
const route = useRoute()
const router = useRouter()

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
