import { msg as msgFromDep } from 'dep-to-optimize'
import { mode, msg } from './modules/workerImport'
import { bundleWithPlugin } from './modules/test-plugin'
import viteSvg from './vite.svg'

self.onmessage = (e) => {
  if (e.data === 'ping') {
    self.postMessage({ msg, mode, bundleWithPlugin, viteSvg })
  }
}
self.postMessage({ msg, mode, bundleWithPlugin, msgFromDep, viteSvg })

// for sourcemap
console.log('my-worker.js')
