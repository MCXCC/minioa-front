import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@/styles/common.css'

// 引入element-plus模块
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入初始化样式文件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).use(router).use(ElementPlus).mount('#app')
