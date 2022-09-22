import vuePlugin from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vuePlugin()],
  build: {
    minify: 'terser',
    terserOptions: {
      format: {
        beautify: true
      },
      compress: {
        passes: 3
      }
    }
  }
})
