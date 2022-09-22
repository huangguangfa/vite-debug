import { performance } from 'node:perf_hooks'
import { cac } from 'cac'
import colors from 'picocolors'
import type { BuildOptions } from './build'
import type { ServerOptions } from './server'
import type { LogLevel } from './logger'
import { createLogger } from './logger'
import { VERSION } from './constants'
import { resolveConfig } from '.'

/* 
  cac: 一款轻量级的交互指令收集器 (https://www.npmjs.com/package/cac)
  通过配置的option、用户如果有带上指令的话就会被保存在操作对象中、最后在操作对象里面取出用户传入的配置信息

  const cli = require("cac")()
  cli.option("-t, --type <type>", "Choose a project type")
  const parsed = cli.parse()
  console.log(JSON.stringify(parsed, null, 2)); // 执行 node index.js --type test 获取用户的选项配置

  picocolors: 终端文字颜色
*/
const cli = cac('vite')

/*
  当前文件做了什么:
    配置不同指令代码、按用户输入的指令执行不同的代码
    分别有: dev build optimize
*/

// global options
interface GlobalCLIOptions {
  '--'?: string[]
  c?: boolean | string
  config?: string
  base?: string
  l?: LogLevel
  logLevel?: LogLevel
  clearScreen?: boolean
  d?: boolean | string
  debug?: boolean | string
  f?: string
  filter?: string
  m?: string
  mode?: string
  force?: boolean
}

/**
 * removing global flags before passing as command specific sub-configs
 */
function cleanOptions<Options extends GlobalCLIOptions>(
  options: Options
): Omit<Options, keyof GlobalCLIOptions> {
  const ret = { ...options }
  delete ret['--']
  delete ret.c
  delete ret.config
  delete ret.base
  delete ret.l
  delete ret.logLevel
  delete ret.clearScreen
  delete ret.d
  delete ret.debug
  delete ret.f
  delete ret.filter
  delete ret.m
  delete ret.mode
  return ret
}

cli
  .option('-c, --config <file>', `[string] use specified config file`)
  .option('--base <path>', `[string] public base path (default: /)`)
  .option('-l, --logLevel <level>', `[string] info | warn | error | silent`)
  .option('--clearScreen', `[boolean] allow/disable clear screen when logging`)
  .option('-d, --debug [feat]', `[string | boolean] show debug logs`)
  .option('-f, --filter <filter>', `[string] filter debug logs`)
  .option('-m, --mode <mode>', `[string] set env mode`)

// dev
cli
  .command('[root]', 'start dev server') // default command
  .alias('serve') // the command is called 'serve' in Vite's API
  .alias('dev') // alias to align with the script name
  .option('--host [host]', `[string] specify hostname`)
  .option('--port <port>', `[number] specify port`)
  .option('--https', `[boolean] use TLS + HTTP/2`)
  .option('--open [path]', `[boolean | string] open browser on startup`)
  .option('--cors', `[boolean] enable CORS`)
  .option('--strictPort', `[boolean] exit if specified port is already in use`)
  .option(
    '--force',
    `[boolean] force the optimizer to ignore the cache and re-bundle`
  )
  .action(async (root: string, options: ServerOptions & GlobalCLIOptions) => {
    // output structure is preserved even after bundling so require()
    // is ok here
    const { createServer } = await import('./server')
    try {
      const server = await createServer({
        root,
        base: options.base,
        mode: options.mode,
        configFile: options.config,
        logLevel: options.logLevel,
        clearScreen: options.clearScreen,
        optimizeDeps: { force: options.force },
        server: cleanOptions(options)
      })
      // 服务不可用
      if (!server.httpServer) {
        throw new Error('HTTP server not available')
      }
      // 启动服务
      await server.listen()

      const info = server.config.logger.info

      // @ts-ignore
      const viteStartTime = global.__vite_start_time ?? false
      const startupDurationString = viteStartTime
        ? colors.dim(
            `ready in ${colors.reset(
              colors.bold(Math.ceil(performance.now() - viteStartTime))
            )} ms`
          )
        : ''

      info(
        `\n  ${colors.green(
          `${colors.bold('VITE')} v${VERSION}`
        )}  ${startupDurationString}\n`,
        { clear: !server.config.logger.hasWarned }
      )

      server.printUrls()
    } catch (e) {
      createLogger(options.logLevel).error(
        colors.red(`error when starting dev server:\n${e.stack}`),
        { error: e }
      )
      process.exit(1)
    }
  })

// build
cli
  .command('build [root]', 'build for production')
  .option('--target <target>', `[string] transpile target (default: 'modules')`)
  .option('--outDir <dir>', `[string] output directory (default: dist)`)
  .option(
    '--assetsDir <dir>',
    `[string] directory under outDir to place assets in (default: assets)`
  )
  .option(
    '--assetsInlineLimit <number>',
    `[number] static asset base64 inline threshold in bytes (default: 4096)`
  )
  .option(
    '--ssr [entry]',
    `[string] build specified entry for server-side rendering`
  )
  .option(
    '--sourcemap',
    `[boolean] output source maps for build (default: false)`
  )
  .option(
    '--minify [minifier]',
    `[boolean | "terser" | "esbuild"] enable/disable minification, ` +
      `or specify minifier to use (default: esbuild)`
  )
  .option('--manifest [name]', `[boolean | string] emit build manifest json`)
  .option('--ssrManifest [name]', `[boolean | string] emit ssr manifest json`)
  .option(
    '--force',
    `[boolean] force the optimizer to ignore the cache and re-bundle (experimental)`
  )
  .option(
    '--emptyOutDir',
    `[boolean] force empty outDir when it's outside of root`
  )
  .option('-w, --watch', `[boolean] rebuilds when modules have changed on disk`)
  .action(async (root: string, options: BuildOptions & GlobalCLIOptions) => {
    const { build } = await import('./build')
    const buildOptions: BuildOptions = cleanOptions(options)

    try {
      await build({
        root,
        base: options.base,
        mode: options.mode,
        configFile: options.config,
        logLevel: options.logLevel,
        clearScreen: options.clearScreen,
        optimizeDeps: { force: options.force },
        build: buildOptions
      })
    } catch (e) {
      createLogger(options.logLevel).error(
        colors.red(`error during build:\n${e.stack}`),
        { error: e }
      )
      process.exit(1)
    }
  })

// optimize
cli
  .command('optimize [root]', 'pre-bundle dependencies')
  .option(
    '--force',
    `[boolean] force the optimizer to ignore the cache and re-bundle`
  )
  .action(
    async (root: string, options: { force?: boolean } & GlobalCLIOptions) => {
      const { optimizeDeps } = await import('./optimizer')
      try {
        const config = await resolveConfig(
          {
            root,
            base: options.base,
            configFile: options.config,
            logLevel: options.logLevel
          },
          'build',
          'development'
        )
        await optimizeDeps(config, options.force, true)
      } catch (e) {
        createLogger(options.logLevel).error(
          colors.red(`error when optimizing deps:\n${e.stack}`),
          { error: e }
        )
        process.exit(1)
      }
    }
  )

cli
  .command('preview [root]', 'locally preview production build')
  .option('--host [host]', `[string] specify hostname`)
  .option('--port <port>', `[number] specify port`)
  .option('--strictPort', `[boolean] exit if specified port is already in use`)
  .option('--https', `[boolean] use TLS + HTTP/2`)
  .option('--open [path]', `[boolean | string] open browser on startup`)
  .action(
    async (
      root: string,
      options: {
        host?: string | boolean
        port?: number
        https?: boolean
        open?: boolean | string
        strictPort?: boolean
      } & GlobalCLIOptions
    ) => {
      const { preview } = await import('./preview')
      try {
        const server = await preview({
          root,
          base: options.base,
          configFile: options.config,
          logLevel: options.logLevel,
          mode: options.mode,
          preview: {
            port: options.port,
            strictPort: options.strictPort,
            host: options.host,
            https: options.https,
            open: options.open
          }
        })
        server.printUrls()
      } catch (e) {
        createLogger(options.logLevel).error(
          colors.red(`error when starting preview server:\n${e.stack}`),
          { error: e }
        )
        process.exit(1)
      }
    }
  )

cli.help()
cli.version(VERSION)

cli.parse()
