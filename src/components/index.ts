import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
// 引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComponent: any = { SvgIcon, Pagination }

// 对外暴露插件对象
export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach((key) => {
      // 注册项目全部的全局组件
      app.component(key, allGlobalComponent[key])
    })
    // 将element-plus提供图标为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
