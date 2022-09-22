const path = require('node:path')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const vite = require('vite')

module.exports = vite.defineConfig({
  base: './',
  worker: {
    format: 'es',
    plugins: [vueJsx()],
    rollupOptions: {
      output: {
        assetFileNames: 'worker-assets/worker_asset.[name]-[hash].[ext]',
        chunkFileNames: 'worker-chunks/worker_chunk.[name]-[hash].js',
        entryFileNames: 'worker-entries/worker_entry.[name]-[hash].js'
      }
    }
  },
  build: {
    outDir: 'dist/relative-base',
    rollupOptions: {
      output: {
        assetFileNames: 'other-assets/[name]-[hash].[ext]',
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: 'entries/[name]-[hash].js'
      }
    }
  },
  testConfig: {
    baseRoute: '/relative-base/'
  },
  plugins: [
    {
      name: 'resolve-format-es',
      transform(code, id) {
        if (id.includes('main.js')) {
          return code.replace(
            `/* flag: will replace in vite config import("./format-es.js") */`,
            `import("./main-format-es")`
          )
        }
      }
    }
  ]
})
