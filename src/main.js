import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'

// 导入国际化配置
import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import zh from '../locales/zh'

// 导入 Font Awesome 核心模块
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
// 添加所有图标到库中
library.add(fas)

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false,
  locale: 'en', // 默认语言为英文
  messages: {
    en,
    zh
  }
})

// 创建应用实例
const app = createApp(App)

// 使用插件
app.use(i18n)

// 注册 Font Awesome 组件
app.component('FontAwesomeIcon', FontAwesomeIcon)

// 挂载应用
app.mount('#app')
