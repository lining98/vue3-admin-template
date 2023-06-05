// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
// 引入操作本地存储的工具方法
import { SET_TOKEN,GET_TOKEN } from '@/utils/token'

export const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户唯一标识token
    }
  },
  getters: {},
  actions: {
    // 用户登录的方法
    async userLogin(data: loginForm) {
      const res: loginResponseData = await reqLogin(data)
      if (res.code === 200) {
        // pinia仓库存储一下token
        // 由于pinia|vuex存储数据其实利用js对象
        this.token = res.data.token as string
        // 本地存储持久化存储一份
        SET_TOKEN(res.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    },
  },
})
