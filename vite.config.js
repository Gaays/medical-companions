import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          // 自动导入 Element Plus 图标
          importStyle: 'css',
          directives: true,
          version: '^2.13.0',
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          // 自动导入 Element Plus 图标
          importStyle: 'css',
          directives: true,
          version: '^2.13.0',
        }),
      ],
    }),
  ],
  // 分文件类型打包配置
  build: {
    // 输出目录
    outDir: 'dist',
    // 静态资源目录
    assetsDir: 'assets',
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 关闭生产环境 source map
    sourcemap: false,
    // 禁止将图片等静态资源内联为 base64，所有资源都直接引用
    assetsInlineLimit: 0,
    // 配置 Rolldown 输出选项
    rolldownOptions: {
      output: {
        // 入口文件命名格式
        entryFileNames: 'js/[name].[hash].js',
        // chunk 文件命名格式
        chunkFileNames: 'js/[name].[hash].js',
        // 静态资源命名格式
        assetFileNames: (chunkInfo) => {
          // 根据文件类型设置不同的输出目录
          if (chunkInfo.name) {
            const ext = chunkInfo.name.split('.').pop();
            if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'ico'].includes(ext)) {
              return 'images/[name].[hash].[ext]';
            } else if (['css'].includes(ext)) {
              return 'css/[name].[hash].[ext]';
            } else if (['woff', 'woff2', 'ttf', 'eot'].includes(ext)) {
              return 'fonts/[name].[hash].[ext]';
            }
          }
          // 默认静态资源目录
          return 'assets/[name].[hash].[ext]';
        },
        // 手动代码分割
        manualChunks: (id) => {
          // 将 Vue 相关库打包为一个 chunk
          if (id.includes('vue') || id.includes('vue-router') || id.includes('vue-i18n')) {
            return 'vue';
          }
          // 将 Element Plus 打包为一个 chunk
          if (id.includes('element-plus')) {
            return 'elementPlus';
          }
          // 将 axios 打包为一个 chunk
          if (id.includes('axios')) {
            return 'utils';
          }
        },
      },
    },
  },
})