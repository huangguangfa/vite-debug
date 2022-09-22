#!/usr/bin/env node
import { performance } from 'node:perf_hooks'

/* 
  本文js做了啥:
    做一些初始化配置的开启动作、比如debug和node:inspector 收集信息、然后执行入口cli
*/

// 路径不是node_modules
if (!import.meta.url.includes('node_modules')) {
  try {
    // 在dev模式下才去做source-map的映射
    await import('source-map-support').then((r) => r.default.install())
  } catch (e) {}
}
// 获取启动时间
global.__vite_start_time = performance.now()

// 检查是不是debug模式
const debugIndex = process.argv.findIndex((arg) => /^(?:-d|--debug)$/.test(arg))
// 是否配置过滤日志信息
const filterIndex = process.argv.findIndex((arg) =>
  /^(?:-f|--filter)$/.test(arg)
)
// profileIndex
const profileIndex = process.argv.indexOf('--profile')

// 开启调试日志
if (debugIndex > 0) {
  let value = process.argv[debugIndex + 1]
  if (!value || value.startsWith('-')) {
    value = 'vite:*'
  } else {
    // support debugging multiple flags with comma-separated list
    value = value
      .split(',')
      .map((v) => `vite:${v}`)
      .join(',')
  }
  process.env.DEBUG = `${
    process.env.DEBUG ? process.env.DEBUG + ',' : ''
  }${value}`

  if (filterIndex > 0) {
    const filter = process.argv[filterIndex + 1]
    if (filter && !filter.startsWith('-')) {
      process.env.VITE_DEBUG_FILTER = filter
    }
  }
}

// cli 入口文件
function start() {
  return import('../dist/node/cli.js')
}

// 实时收集Node.js进程的内存，CPU等数据，动态开启，配置后可把收集的数据写入某个文件里面去 --profile
if (profileIndex > 0) {
  process.argv.splice(profileIndex, 1)
  const next = process.argv[profileIndex]
  if (next && !next.startsWith('-')) {
    process.argv.splice(profileIndex, 1)
  }
  const inspector = await import('node:inspector').then((r) => r.default)
  const session = (global.__vite_profile_session = new inspector.Session())
  session.connect()
  session.post('Profiler.enable', () => {
    session.post('Profiler.start', start)
  })
} else {
  start()
}
