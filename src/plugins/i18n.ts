import { createI18n } from 'vue-i18n'
import en from '../../locales/en'
import zh from '../../locales/zh'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
      en,
      zh,
    },
  })

  nuxtApp.vueApp.use(i18n)
})
