import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    port: 3001,
    // proxy: {
    //   '/api': {
    //     target: 'https://ivy-server.onrender.com:3000/',
    //     // ws: true,
    //     // changeOrigin: true
    //   }
    // }
  }
})
