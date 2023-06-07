<template>
  <div>
    <el-card>
      <img :src="avatar" alt="" />
      <div>
        {{ username }}
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const { username, avatar } = storeToRefs(useUserStore())
const { userInfo } = useUserStore()

onMounted(() => {
  userInfo()
})
</script>

<style lang="scss" scoped></style>
