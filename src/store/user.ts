// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入数据类型
import type { loginForm } from '@/api/user/type'
import { reqLogin } from '@/api/user'

export const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: localStorage.getItem('token'),
    }
  },
  getters: {},
  actions: {
    // 用户登录的方法
    async userLogin(data: loginForm) {
      const res = await reqLogin(data)
      if (res.code === 200) {
        this.token = res.data.token
        // 本地存储持久化存储一份
        localStorage.setItem('token', res.data.token)
      } else {
        console.log(1)
      }
    },
  },
})
