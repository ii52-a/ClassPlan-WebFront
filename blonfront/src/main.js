

import { createApp } from 'vue'
import { createPinia } from 'pinia'
//启用ElementPlus
import ElementPlus from 'element-plus'
//启用Elment样式
import 'element-plus/dist/index.css'
import App from './App.vue'
//启用路由
import router from './router'
//启用中文elementPlus
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
//启用icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')
