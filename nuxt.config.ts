export default defineNuxtConfig({
  srcDir: 'src',
  ssr: true,
  devtools: { enabled: true },
  experimental: {
    appManifest: false,
  },
  modules: ['@nuxtjs/tailwindcss'],
  build: {
    transpile: [
      'vue-i18n',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome',
      'md-editor-v3',
    ],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    },
  },
  css: ['~/styles/index.scss', 'element-plus/dist/index.css'],
  runtimeConfig: {
    supabaseUrl: '',
    supabaseServiceRoleKey: '',
    adminPassword: '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      siteName: 'China Health Check Guide',
    },
  },
  dir: {
    public: 'public',
  },
  nitro: {
    preset: 'vercel',
  },
  compatibilityDate: '2026-04-30',
})
