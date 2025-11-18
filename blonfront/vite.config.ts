import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import type { UserConfig } from 'vite'  // 导入类型定义

// https://vite.dev/config/
export default defineConfig((): UserConfig => {
  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    // 可选：添加更多配置
    server: {
      port: 3000,
      open: true  // 自动打开浏览器
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets'
    }
  }
})