// eslint-disable-next-line import/no-nodejs-modules
const { resolve } = require('path')
const chokidar = require('chokidar')
const colors = require('picocolors')

const dirPath = resolve('./src') // 设置监听的文件夹目录
const watcher = chokidar.watch(dirPath)

watcher
  .on('change', (path) => {
    console.log(colors.cyan(`文件发送变动：${path}`))
  })
  .on('add', (path) => {
    console.log(colors.yellow(`添加【文件】监听${path}`))
  })
  .on('addDir', (path) => {
    console.log(colors.blue(`添加【文件夹】监听：${path}`))
  })

setTimeout(() => {
  const temp = resolve('./temp') // 五秒后添加一个监听变动文件夹
  watcher.add(temp)
}, 10000)

// node index.js
