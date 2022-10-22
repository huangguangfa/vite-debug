import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import { vueI18nPlugin } from './CustomBlockPlugin'

const templateCommentReg = /<!--[\s\S]*?-->/g

function templateComment() {
  return {
    name: 'vite-plugin-templateComment',
    transform(code: string) {
      if (templateCommentReg.test(code)) {
        code = code.replace(templateCommentReg, '')
        return code
      }
    }
  }
}
const envPrefix = 'KY_DOC'
export default defineConfig({
  resolve: {
    alias: {
      '/@': __dirname,
      '@': __dirname
    }
  },

  plugins: [
    // templateComment(),
    vuePlugin({
      reactivityTransform: true
    })
    // splitVendorChunkPlugin(),
    // vueI18nPlugin
  ],
  envDir: './env',
  envPrefix,
  build: {
    // to make tests faster
    minify: false,
    rollupOptions: {
      output: {
        // Test splitVendorChunkPlugin composition
        manualChunks(id) {
          if (id.includes('src-import')) {
            return 'src-import'
          }
        }
      }
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  }
})
