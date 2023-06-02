import { createApp } from 'vue'
import App from '@/App.vue'
// 引入element-plus插件域样式
import ELementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置element-plus国际化
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 获取应用实例对象
const app = createApp(App)
// 安装element-plus插件
app.use(ELementPlus, {
  locale: zhCn, // element-plus国际化配置
})
// svg插件需要配置代码
import 'virtual:svg-icons-register'

// 引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components'
// 安装自定义插件
app.use(globalComponent)

// 引入模版的全局样式
import '@/styles/index.scss'

// 将应用挂载到挂载点上
app.mount('#app')
