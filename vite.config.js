import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import eslint from 'vite-plugin-eslint'
import json5Plugin from 'vite-plugin-json5'

// eslint-disable-next-line no-undef
const baseUrl = process.env.NODE_ENV === 'production' ? '/dataView/' : '/'
// https://vitejs.dev/config/
export default defineConfig({
  base: baseUrl,
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    eslint(),
    json5Plugin(),
  ],
  build: {
    outDir: 'docs',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/variables.scss";',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: 'http://yx.nx.zgs.yun/mcs/api', // 湖南生产
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
