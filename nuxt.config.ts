export default defineNuxtConfig({
  srcDir: 'src',
  ssr: true,
  devtools: { enabled: true },
  experimental: {
    appManifest: false,
  },
  modules: ['@nuxtjs/tailwindcss'],
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
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    adminPassword: process.env.ADMIN_PASSWORD || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      siteName: 'China Health Check Guide',
    },
  },
  nitro: {
    preset: 'vercel',
  },
  compatibilityDate: '2026-04-30',
})
