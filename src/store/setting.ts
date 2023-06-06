import { defineStore } from 'pinia'

export const useSettingStore = defineStore('Setting', {
  state: () => {
    return {
      fold: false, // 用户控制菜单折叠还是收起
      refresh: false, //用于界面的刷新效果
    }
  },
})
