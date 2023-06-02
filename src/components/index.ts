import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'

const allGlobalComponent:any = { SvgIcon, Pagination }

// 对外暴露插件对象
export default {
  install(app:any) {
    Object.keys(allGlobalComponent).forEach((key) => {
      // 注册项目全部的全局组件
      app.component(key, allGlobalComponent[key])
    })
  },
}
