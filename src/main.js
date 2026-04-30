import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router/index.js'

// 导入国际化配置
import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import zh from '../locales/zh'

// 导入 Font Awesome 核心模块
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBars,
  faCheckCircle,
  faChevronDown,
  faCircleCheck,
  faFileMedical,
  faLanguage,
  faLocationDot,
  faLock,
  faRoute,
  faShieldHalved,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faBars,
  faCheckCircle,
  faChevronDown,
  faCircleCheck,
  faFileMedical,
  faLanguage,
  faLocationDot,
  faLock,
  faRoute,
  faShieldHalved,
  faTimes
)

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
app.use(router)

// 注册 Font Awesome 组件
app.component('FontAwesomeIcon', FontAwesomeIcon)

// 挂载应用
app.mount('#app')
