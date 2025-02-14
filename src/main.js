//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 引入common.scss
import '@/styles/common.scss'
import {lazyPlugin} from '@/directives'
import { componentPlugin } from './components'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia=createPinia()
//注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
// 全局指令注册
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')
