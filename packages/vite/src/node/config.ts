import fs from 'node:fs'
import path from 'node:path'
import { parse as parseUrl, pathToFileURL } from 'node:url'
import { performance } from 'node:perf_hooks'
import { createRequire } from 'node:module'
import colors from 'picocolors'
import type { Alias, AliasOptions } from 'types/alias'
import aliasPlugin from '@rollup/plugin-alias'
import { build } from 'esbuild'
import type { RollupOptions } from 'rollup'
import type { HookHandler, Plugin } from './plugin'
import type {
  BuildOptions,
  RenderBuiltAssetUrl,
  ResolvedBuildOptions
} from './build'
import { resolveBuildOptions } from './build'
import type { ResolvedServerOptions, ServerOptions } from './server'
import { resolveServerOptions } from './server'
import type { PreviewOptions, ResolvedPreviewOptions } from './preview'
import { resolvePreviewOptions } from './preview'
import type { CSSOptions } from './plugins/css'
import {
  asyncFlatten,
  createDebugger,
  createFilter,
  dynamicImport,
  isExternalUrl,
  isObject,
  lookupFile,
  mergeAlias,
  mergeConfig,
  normalizeAlias,
  normalizePath
} from './utils'
import {
  createPluginHookUtils,
  getSortedPluginsByHook,
  resolvePlugins
} from './plugins'
import type { ESBuildOptions } from './plugins/esbuild'
import {
  CLIENT_ENTRY,
  DEFAULT_ASSETS_RE,
  DEFAULT_CONFIG_FILES,
  ENV_ENTRY
} from './constants'
import type { InternalResolveOptions, ResolveOptions } from './plugins/resolve'
import { resolvePlugin } from './plugins/resolve'
import type { LogLevel, Logger } from './logger'
import { createLogger } from './logger'
import type { DepOptimizationConfig, DepOptimizationOptions } from './optimizer'
import type { JsonOptions } from './plugins/json'
import type { PluginContainer } from './server/pluginContainer'
import { createPluginContainer } from './server/pluginContainer'
import type { PackageCache } from './packages'
import { loadEnv, resolveEnvPrefix } from './env'
import type { ResolvedSSROptions, SSROptions } from './ssr'
import { resolveSSROptions } from './ssr'

const debug = createDebugger('vite:config')

export type { RenderBuiltAssetUrl } from './build'

// NOTE: every export in this file is re-exported from ./index.ts so it will
// be part of the public API.

export interface ConfigEnv {
  command: 'build' | 'serve'
  mode: string
  /**
   * @experimental
   */
  ssrBuild?: boolean
}

/**
 * spa: include SPA fallback middleware and configure sirv with `single: true` in preview
 *
 * mpa: only include non-SPA HTML middlewares
 *
 * custom: don't include HTML middlewares
 */
export type AppType = 'spa' | 'mpa' | 'custom'

export type UserConfigFn = (env: ConfigEnv) => UserConfig | Promise<UserConfig>
export type UserConfigExport = UserConfig | Promise<UserConfig> | UserConfigFn

/**
 * Type helper to make it easier to use vite.config.ts
 * accepts a direct {@link UserConfig} object, or a function that returns it.
 * The function receives a {@link ConfigEnv} object that exposes two properties:
 * `command` (either `'build'` or `'serve'`), and `mode`.
 */
export function defineConfig(config: UserConfigExport): UserConfigExport {
  return config
}

export type PluginOption =
  | Plugin
  | false
  | null
  | undefined
  | PluginOption[]
  | Promise<Plugin | false | null | undefined | PluginOption[]>

export interface UserConfig {
  /**
   * Project root directory. Can be an absolute path, or a path relative from
   * the location of the config file itself.
   * @default process.cwd()
   */
  root?: string
  /**
   * Base public path when served in development or production.
   * @default '/'
   */
  base?: string
  /**
   * Directory to serve as plain static assets. Files in this directory are
   * served and copied to build dist dir as-is without transform. The value
   * can be either an absolute file system path or a path relative to <root>.
   *
   * Set to `false` or an empty string to disable copied static assets to build dist dir.
   * @default 'public'
   */
  publicDir?: string | false
  /**
   * Directory to save cache files. Files in this directory are pre-bundled
   * deps or some other cache files that generated by vite, which can improve
   * the performance. You can use `--force` flag or manually delete the directory
   * to regenerate the cache files. The value can be either an absolute file
   * system path or a path relative to <root>.
   * Default to `.vite` when no `package.json` is detected.
   * @default 'node_modules/.vite'
   */
  cacheDir?: string
  /**
   * Explicitly set a mode to run in. This will override the default mode for
   * each command, and can be overridden by the command line --mode option.
   */
  mode?: string
  /**
   * Define global variable replacements.
   * Entries will be defined on `window` during dev and replaced during build.
   */
  define?: Record<string, any>
  /**
   * Array of vite plugins to use.
   */
  plugins?: PluginOption[]
  /**
   * Configure resolver
   */
  resolve?: ResolveOptions & { alias?: AliasOptions }
  /**
   * CSS related options (preprocessors and CSS modules)
   */
  css?: CSSOptions
  /**
   * JSON loading options
   */
  json?: JsonOptions
  /**
   * Transform options to pass to esbuild.
   * Or set to `false` to disable esbuild.
   */
  esbuild?: ESBuildOptions | false
  /**
   * Specify additional picomatch patterns to be treated as static assets.
   */
  assetsInclude?: string | RegExp | (string | RegExp)[]
  /**
   * Server specific options, e.g. host, port, https...
   */
  server?: ServerOptions
  /**
   * Build specific options
   */
  build?: BuildOptions
  /**
   * Preview specific options, e.g. host, port, https...
   */
  preview?: PreviewOptions
  /**
   * Dep optimization options
   */
  optimizeDeps?: DepOptimizationOptions
  /**
   * SSR specific options
   */
  ssr?: SSROptions
  /**
   * Experimental features
   *
   * Features under this field could change in the future and might NOT follow semver.
   * Please be careful and always pin Vite's version when using them.
   * @experimental
   */
  experimental?: ExperimentalOptions
  /**
   * Legacy options
   *
   * Features under this field only follow semver for patches, they could be removed in a
   * future minor version. Please always pin Vite's version to a minor when using them.
   */
  legacy?: LegacyOptions
  /**
   * Log level.
   * Default: 'info'
   */
  logLevel?: LogLevel
  /**
   * Custom logger.
   */
  customLogger?: Logger
  /**
   * Default: true
   */
  clearScreen?: boolean
  /**
   * Environment files directory. Can be an absolute path, or a path relative from
   * the location of the config file itself.
   * @default root
   */
  envDir?: string
  /**
   * Env variables starts with `envPrefix` will be exposed to your client source code via import.meta.env.
   * @default 'VITE_'
   */
  envPrefix?: string | string[]
  /**
   * Worker bundle options
   */
  worker?: {
    /**
     * Output format for worker bundle
     * @default 'iife'
     */
    format?: 'es' | 'iife'
    /**
     * Vite plugins that apply to worker bundle
     */
    plugins?: PluginOption[]
    /**
     * Rollup options to build worker bundle
     */
    rollupOptions?: Omit<
      RollupOptions,
      'plugins' | 'input' | 'onwarn' | 'preserveEntrySignatures'
    >
  }
  /**
   * Whether your application is a Single Page Application (SPA),
   * a Multi-Page Application (MPA), or Custom Application (SSR
   * and frameworks with custom HTML handling)
   * @default 'spa'
   */
  appType?: AppType
}

export interface ExperimentalOptions {
  /**
   * Append fake `&lang.(ext)` when queries are specified, to preserve the file extension for following plugins to process.
   *
   * @experimental
   * @default false
   */
  importGlobRestoreExtension?: boolean
  /**
   * Allow finegrain control over assets and public files paths
   *
   * @experimental
   */
  renderBuiltUrl?: RenderBuiltAssetUrl
  /**
   * Enables support of HMR partial accept via `import.meta.hot.acceptExports`.
   *
   * @experimental
   * @default false
   */
  hmrPartialAccept?: boolean
}

export interface LegacyOptions {
  /**
   * Revert vite build --ssr to the v2.9 strategy. Use CJS SSR build and v2.9 externalization heuristics
   *
   * @experimental
   * @deprecated
   * @default false
   */
  buildSsrCjsExternalHeuristics?: boolean
}

export interface ResolveWorkerOptions extends PluginHookUtils {
  format: 'es' | 'iife'
  plugins: Plugin[]
  rollupOptions: RollupOptions
}

export interface InlineConfig extends UserConfig {
  configFile?: string | false
  envFile?: false
}

export type ResolvedConfig = Readonly<
  Omit<UserConfig, 'plugins' | 'assetsInclude' | 'optimizeDeps' | 'worker'> & {
    configFile: string | undefined
    configFileDependencies: string[]
    inlineConfig: InlineConfig
    root: string
    base: string
    publicDir: string
    cacheDir: string
    command: 'build' | 'serve'
    mode: string
    isWorker: boolean
    // in nested worker bundle to find the main config
    /** @internal */
    mainConfig: ResolvedConfig | null
    isProduction: boolean
    env: Record<string, any>
    resolve: ResolveOptions & {
      alias: Alias[]
    }
    plugins: readonly Plugin[]
    server: ResolvedServerOptions
    build: ResolvedBuildOptions
    preview: ResolvedPreviewOptions
    ssr: ResolvedSSROptions
    assetsInclude: (file: string) => boolean
    logger: Logger
    createResolver: (options?: Partial<InternalResolveOptions>) => ResolveFn
    optimizeDeps: DepOptimizationOptions
    /** @internal */
    packageCache: PackageCache
    worker: ResolveWorkerOptions
    appType: AppType
    experimental: ExperimentalOptions
  } & PluginHookUtils
>

export interface PluginHookUtils {
  getSortedPlugins: (hookName: keyof Plugin) => Plugin[]
  getSortedPluginHooks: <K extends keyof Plugin>(
    hookName: K
  ) => NonNullable<HookHandler<Plugin[K]>>[]
}

export type ResolveFn = (
  id: string,
  importer?: string,
  aliasOnly?: boolean,
  ssr?: boolean
) => Promise<string | undefined>

/* 导出vite所有的配置 */
export async function resolveConfig(
  inlineConfig: InlineConfig,
  command: 'build' | 'serve',
  defaultMode = 'development'
): Promise<ResolvedConfig> {
  // 获取基础配置对象
  let config = inlineConfig
  let configFileDependencies: string[] = []
  // 当前运行模式设置
  let mode = inlineConfig.mode || defaultMode

  // 如果是生产环境我们需要设置下process.env.NODE_ENV、怕其他有依赖于process
  if (mode === 'production') {
    process.env.NODE_ENV = 'production'
  }
  // 开发环境设置
  if (command === 'serve' && process.env.NODE_ENV === 'production') {
    process.env.NODE_ENV = 'development'
  }
  // 保存当前运行的环境配置信息
  const configEnv = {
    mode,
    command,
    ssrBuild: !!config.build?.ssr // 是否是ssr(服务端渲染)
  }
  // 取出指令携带的配置文件地址 --configFile /xxx/xxx/vite.config.ts
  let { configFile } = config
  // 可能存在一定知道没有配置文件的情况 configFile === false
  if (configFile !== false) {
    // 加载本地根节点的vite.cofnig.xxx文件内容
    const loadResult = await loadConfigFromFile(
      configEnv,
      configFile,
      config.root,
      config.logLevel
    )
    // 有vite配置文件结果
    if (loadResult) {
      // 合并配置、用户可能会在指令里面添加一些配置 --xxx系列 、指令的配置权重会大于配置文件的规则
      config = mergeConfig(loadResult.config, config)
      // 配置文件地址
      configFile = loadResult.path
      // 依赖bundle关系
      configFileDependencies = loadResult.dependencies
    }
  }

  // Define logger
  const logger = createLogger(config.logLevel, {
    allowClearScreen: config.clearScreen,
    customLogger: config.customLogger
  })

  // 优先使用 --mode
  mode = inlineConfig.mode || config.mode || mode
  configEnv.mode = mode

  // Some plugins that aren't intended to work in the bundling of workers (doing post-processing at build time for example).
  // And Plugins may also have cached that could be corrupted by being used in these extra rollup calls.
  // So we need to separate the worker plugin from the plugin that vite needs to run.
  // 把worker插件区分出来
  const rawWorkerUserPlugins = (
    (await asyncFlatten(config.worker?.plugins || [])) as Plugin[]
  ).filter((p) => {
    if (!p) {
      return false
    } else if (!p.apply) {
      return true
    } else if (typeof p.apply === 'function') {
      // 执行用户插件定义的apply方法
      return p.apply({ ...config, mode }, configEnv)
    } else {
      // 用户定义什么环境会执行的插件 p.apply === "build" | "serve"
      return p.apply === command
    }
  })

  // plugins
  const rawUserPlugins = (
    (await asyncFlatten(config.plugins || [])) as Plugin[]
  ).filter((p) => {
    if (!p) {
      return false
      // 没有apply的返回出去
    } else if (!p.apply) {
      return true
      // 执行用户插件定义的apply方法
    } else if (typeof p.apply === 'function') {
      return p.apply({ ...config, mode }, configEnv)
    } else {
      // 用户定义什么环境会执行的插件 p.apply === "build" | "serve"
      return p.apply === command
    }
  })
  /* 
    区分出插件的顺序  enforce 的值可以是pre 或 post see https://cn.vitejs.dev/guide/api-plugin.html#plugin-ordering 
    prePlugins (前)
    normalPlugins(正常)
    postPlugins(后)
  */
  const [prePlugins, normalPlugins, postPlugins] =
    sortUserPlugins(rawUserPlugins)

  // 排序好个个阶段需要运行插件
  const userPlugins = [...prePlugins, ...normalPlugins, ...postPlugins]
  // 执行插件队列中带有handler的方法、目的是为了往修改配置、得到最终的配置
  config = await runConfigHook(config, userPlugins, configEnv)
  // 没有插件、 COMMONJS 的测试
  if (process.env.VITE_TEST_WITHOUT_PLUGIN_COMMONJS) {
    config = mergeConfig(config, {
      optimizeDeps: { disabled: false },
      ssr: { optimizeDeps: { disabled: false } }
    })
    config.build ??= {}
    config.build.commonjsOptions = { include: [] }
  }

  // 获取运行项目根节点正确的路径 /xxx/vite-debug/playground/vue
  const resolvedRoot = normalizePath(
    config.root ? path.resolve(config.root) : process.cwd()
  )

  // 这里设置vite内部的别名、如果客户端通过@vite/xxx 就直接通过别名映射查找到对应的地址
  const clientAlias = [
    { find: /^[\/]?@vite\/env/, replacement: () => ENV_ENTRY },
    { find: /^[\/]?@vite\/client/, replacement: () => CLIENT_ENTRY }
  ]

  // 合并内部客户端和用户配置 [别名] 解析
  const resolvedAlias = normalizeAlias(
    mergeAlias(
      // @ts-ignore because @rollup/plugin-alias' type doesn't allow function
      // replacement, but its implementation does work with function values.
      clientAlias,
      config.resolve?.alias || []
    )
  )
  //
  const resolveOptions: ResolvedConfig['resolve'] = {
    ...config.resolve,
    alias: resolvedAlias
  }

  // load .env files
  const envDir = config.envDir
    ? normalizePath(path.resolve(resolvedRoot, config.envDir))
    : resolvedRoot
  // 加载用户自定义的运行环境变量文件
  const userEnv =
    inlineConfig.envFile !== false &&
    loadEnv(mode, envDir, resolveEnvPrefix(config))

  // Note it is possible for user to have a custom mode, e.g. `staging` where
  // production-like behavior is expected. This is indicated by NODE_ENV=production
  // loaded from `.staging.env` and set by us as VITE_USER_NODE_ENV
  const isProduction =
    (process.env.NODE_ENV || process.env.VITE_USER_NODE_ENV || mode) ===
    'production'
  if (isProduction) {
    // in case default mode was not production and is overwritten
    process.env.NODE_ENV = 'production'
  }

  // resolve public base url
  const isBuild = command === 'build'
  const relativeBaseShortcut = config.base === '' || config.base === './'

  // During dev, we ignore relative base and fallback to '/'
  // For the SSR build, relative base isn't possible by means
  // of import.meta.url.
  // 定义资源路由的获取路径
  const resolvedBase = relativeBaseShortcut
    ? !isBuild || config.build?.ssr
      ? '/'
      : './'
    : resolveBaseUrl(config.base, isBuild, logger) ?? '/'
  // vite内部运行、build的选项合并
  const resolvedBuildOptions = resolveBuildOptions(
    config.build,
    isBuild,
    logger
  )

  // resolve cache directory
  const pkgPath = lookupFile(resolvedRoot, [`package.json`], { pathOnly: true })
  // 缓存资源的文件夹地址
  const cacheDir = config.cacheDir
    ? // 如果传入就使用传入的
      path.resolve(resolvedRoot, config.cacheDir)
    : pkgPath
    ? // 没有传入就使用package.json下的 node_modules/.vite
      path.join(path.dirname(pkgPath), `node_modules/.vite`)
    : // 都没有的话就放到根节点 .vite
      path.join(resolvedRoot, `.vite`)
  // 不清楚这个干嘛的
  const assetsFilter = config.assetsInclude
    ? createFilter(config.assetsInclude)
    : () => false

  // 创建一个内部解析器以用于特殊场景，例如: 优化器和处理 css @imports
  const createResolver: ResolvedConfig['createResolver'] = (options) => {
    let aliasContainer: PluginContainer | undefined
    let resolverContainer: PluginContainer | undefined
    return async (id, importer, aliasOnly, ssr) => {
      let container: PluginContainer
      if (aliasOnly) {
        container =
          aliasContainer ||
          (aliasContainer = await createPluginContainer({
            ...resolved,
            plugins: [aliasPlugin({ entries: resolved.resolve.alias })]
          }))
      } else {
        container =
          resolverContainer ||
          (resolverContainer = await createPluginContainer({
            ...resolved,
            plugins: [
              aliasPlugin({ entries: resolved.resolve.alias }),
              resolvePlugin({
                ...resolved.resolve,
                root: resolvedRoot,
                isProduction,
                isBuild: command === 'build',
                ssrConfig: resolved.ssr,
                asSrc: true,
                preferRelative: false,
                tryIndex: true,
                ...options
              })
            ]
          }))
      }
      return (
        await container.resolveId(id, importer, { ssr, scan: options?.scan })
      )?.id
    }
  }
  // 解析public目录文件夹
  const { publicDir } = config
  const resolvedPublicDir =
    publicDir !== false && publicDir !== ''
      ? path.resolve(
          resolvedRoot,
          typeof publicDir === 'string' ? publicDir : 'public'
        )
      : ''
  // 收集处理server服务的配置、主要涉及: 黑名单文件后缀列表、限制为工作区已外的文件获取、工作区的目录列表
  const server = resolveServerOptions(resolvedRoot, config.server, logger)
  // 收集服务端ssr配置
  const ssr = resolveSSROptions(
    config.ssr,
    config.legacy?.buildSsrCjsExternalHeuristics,
    config.resolve?.preserveSymlinks
  )
  // 是否已中间件模式创建Vite服务器
  const middlewareMode = config?.server?.middlewareMode
  // 依赖优化选项
  const optimizeDeps = config.optimizeDeps || {}
  // 全局基础路径
  const BASE_URL = resolvedBase

  // 合并出一个新的配置变量 workerConfig
  let workerConfig = mergeConfig({}, config)
  /* 
    区分出插件的顺序  enforce 的值可以是pre 或 post see https://cn.vitejs.dev/guide/api-plugin.html#plugin-ordering 
    prePlugins (前)
    normalPlugins(正常)
    postPlugins(后)
  */
  const [workerPrePlugins, workerNormalPlugins, workerPostPlugins] =
    sortUserPlugins(rawWorkerUserPlugins)

  // 执行插件队列中带有handler的方法、目的是为了往修改配置、得到最终的配置
  const workerUserPlugins = [
    ...workerPrePlugins,
    ...workerNormalPlugins,
    ...workerPostPlugins
  ]
  // 和用户插件运行一样的规则: 执行插件队列中带有handler的方法、目的是为了往修改配置、得到最终的配置
  workerConfig = await runConfigHook(workerConfig, workerUserPlugins, configEnv)
  const resolvedWorkerOptions: ResolveWorkerOptions = {
    format: workerConfig.worker?.format || 'iife',
    plugins: [],
    rollupOptions: workerConfig.worker?.rollupOptions || {},
    getSortedPlugins: undefined!,
    getSortedPluginHooks: undefined!
  }
  // 合并最终的全局配置
  const resolvedConfig: ResolvedConfig = {
    configFile: configFile ? normalizePath(configFile) : undefined, // 最终的配置文件地址vite.config.xxx
    configFileDependencies: configFileDependencies.map(
      (
        name // 配置文件的依赖项地址['xxx', 'xxx']
      ) => normalizePath(path.resolve(name))
    ),
    inlineConfig, // 定义配置文件的解析规则 see: https://cn.vitejs.dev/guide/api-javascript.html#inlineconfig
    root: resolvedRoot, // 项目根节点地址
    base: resolvedBase, // 基础url
    resolve: resolveOptions, // resolve配置对象 see: https://cn.vitejs.dev/config/shared-options.html#resolve-dedupe
    publicDir: resolvedPublicDir, // 公共文件夹地址: 'xxx/xxx'
    cacheDir, // 缓存vite的文件目录
    command, // 指令
    mode, // 模式
    ssr, // ssr渲染的配置
    isWorker: false, // 默认不是Worker
    mainConfig: null, // 默认main
    isProduction, // 是否生产环境
    plugins: userPlugins, // 用户自定义的plugins
    server, // server配置
    build: resolvedBuildOptions, // build配置 see : https://cn.vitejs.dev/config/build-options.html
    preview: resolvePreviewOptions(config.preview, server), // https://cn.vitejs.dev/config/preview-options.html#preview-host
    // 环境配置文件信息
    env: {
      ...userEnv,
      BASE_URL,
      MODE: mode,
      DEV: !isProduction,
      PROD: isProduction
    },
    // https://cn.vitejs.dev/config/shared-options.html#assetsinclude
    assetsInclude(file: string) {
      return DEFAULT_ASSETS_RE.test(file) || assetsFilter(file)
    },
    // 记录
    logger,
    // packageCache
    packageCache: new Map(),
    // 内部解析器用于特殊场景，例如: 优化器和处理 css @imports
    createResolver,
    // 优化配置
    optimizeDeps: {
      disabled: 'build',
      ...optimizeDeps,
      esbuildOptions: {
        preserveSymlinks: config.resolve?.preserveSymlinks,
        ...optimizeDeps.esbuildOptions
      }
    },
    // worker配置
    worker: resolvedWorkerOptions,
    // 页面应用模式
    // 'spa'：包含 SPA 回退中间件以及在预览中将 sirv 配置为 single: true
    // 'mpa'：仅包含非 SPA HTML 中间件
    // 'custom'：不包含 HTML 中间件
    appType: config.appType ?? (middlewareMode === 'ssr' ? 'custom' : 'spa'),
    // 高级基础路径选项 see: https://cn.vitejs.dev/guide/build.html#advanced-base-options
    experimental: {
      importGlobRestoreExtension: false,
      hmrPartialAccept: false,
      ...config.experimental
    },
    getSortedPlugins: undefined!,
    getSortedPluginHooks: undefined!
  }
  // 合并下最终的配置、有可能存在用户自定义的配置
  const resolved: ResolvedConfig = {
    ...config,
    ...resolvedConfig
  }
  // 把所有插件都推入插件队列里面去
  ;(resolved.plugins as Plugin[]) = await resolvePlugins(
    resolved,
    prePlugins,
    normalPlugins,
    postPlugins
  )
  // 再次合并最终的配置
  Object.assign(resolved, createPluginHookUtils(resolved.plugins))

  const workerResolved: ResolvedConfig = {
    ...workerConfig,
    ...resolvedConfig,
    isWorker: true,
    mainConfig: resolved
  }
  // worker 插件
  resolvedConfig.worker.plugins = await resolvePlugins(
    workerResolved,
    workerPrePlugins,
    workerNormalPlugins,
    workerPostPlugins
  )
  // 合并worker
  Object.assign(
    resolvedConfig.worker,
    createPluginHookUtils(resolvedConfig.worker.plugins)
  )

  // 执行插件的configResolved钩子 、在这个钩子里面可以获取最终的配置
  await Promise.all([
    ...resolved
      .getSortedPluginHooks('configResolved')
      .map((hook) => hook(resolved)),
    ...resolvedConfig.worker
      .getSortedPluginHooks('configResolved')
      .map((hook) => hook(workerResolved))
  ])

  // 验证配置
  if (middlewareMode === 'ssr') {
    logger.warn(
      colors.yellow(
        `Setting server.middlewareMode to 'ssr' is deprecated, set server.middlewareMode to \`true\`${
          config.appType === 'custom' ? '' : ` and appType to 'custom'`
        } instead`
      )
    )
  }
  if (middlewareMode === 'html') {
    logger.warn(
      colors.yellow(
        `Setting server.middlewareMode to 'html' is deprecated, set server.middlewareMode to \`true\` instead`
      )
    )
  }
  // 删除缓存依赖
  if (
    config.server?.force &&
    !isBuild &&
    config.optimizeDeps?.force === undefined
  ) {
    resolved.optimizeDeps.force = true
    logger.warn(
      colors.yellow(
        `server.force is deprecated, use optimizeDeps.force instead`
      )
    )
  }

  if (process.env.DEBUG) {
    debug(`using resolved config: %O`, {
      ...resolved,
      plugins: resolved.plugins.map((p) => p.name),
      worker: {
        ...resolved.worker,
        plugins: resolved.worker.plugins.map((p) => p.name)
      }
    })
  }

  if (config.build?.terserOptions && config.build.minify !== 'terser') {
    logger.warn(
      colors.yellow(
        `build.terserOptions is specified but build.minify is not set to use Terser. ` +
          `Note Vite now defaults to use esbuild for minification. If you still ` +
          `prefer Terser, set build.minify to "terser".`
      )
    )
  }

  // 检查所有assetFileNames 是否具有相同的引用。
  // 如果不是，则向用户显示警告。
  const outputOption = config.build?.rollupOptions?.output ?? []
  // Use isArray to narrow its type to array
  if (Array.isArray(outputOption)) {
    const assetFileNamesList = outputOption.map(
      (output) => output.assetFileNames
    )
    if (assetFileNamesList.length > 1) {
      const firstAssetFileNames = assetFileNamesList[0]
      const hasDifferentReference = assetFileNamesList.some(
        (assetFileNames) => assetFileNames !== firstAssetFileNames
      )
      if (hasDifferentReference) {
        resolved.logger.warn(
          colors.yellow(`
assetFileNames isn't equal for every build.rollupOptions.output. A single pattern across all outputs is supported by Vite.
`)
        )
      }
    }
  }

  return resolved
}

/**
 * Resolve base url. Note that some users use Vite to build for non-web targets like
 * electron or expects to deploy
 */
export function resolveBaseUrl(
  base: UserConfig['base'] = '/',
  isBuild: boolean,
  logger: Logger
): string {
  if (base.startsWith('.')) {
    logger.warn(
      colors.yellow(
        colors.bold(
          `(!) invalid "base" option: ${base}. The value can only be an absolute ` +
            `URL, ./, or an empty string.`
        )
      )
    )
    base = '/'
  }

  // external URL
  if (isExternalUrl(base)) {
    if (!isBuild) {
      // get base from full url during dev
      const parsed = parseUrl(base)
      base = parsed.pathname || '/'
    }
  } else {
    // ensure leading slash
    if (!base.startsWith('/')) {
      logger.warn(
        colors.yellow(
          colors.bold(`(!) "base" option should start with a slash.`)
        )
      )
      base = '/' + base
    }
  }

  // ensure ending slash
  if (!base.endsWith('/')) {
    logger.warn(
      colors.yellow(colors.bold(`(!) "base" option should end with a slash.`))
    )
    base += '/'
  }

  return base
}

export function sortUserPlugins(
  plugins: (Plugin | Plugin[])[] | undefined
): [Plugin[], Plugin[], Plugin[]] {
  const prePlugins: Plugin[] = []
  const postPlugins: Plugin[] = []
  const normalPlugins: Plugin[] = []

  if (plugins) {
    plugins.flat().forEach((p) => {
      if (p.enforce === 'pre') prePlugins.push(p)
      else if (p.enforce === 'post') postPlugins.push(p)
      else normalPlugins.push(p)
    })
  }

  return [prePlugins, normalPlugins, postPlugins]
}

/* 加载本地的vite.config.xxx文件 */
export async function loadConfigFromFile(
  configEnv: ConfigEnv,
  configFile?: string,
  configRoot: string = process.cwd(),
  logLevel?: LogLevel
): Promise<{
  path: string
  config: UserConfig
  dependencies: string[]
} | null> {
  // 获取开始时间
  const start = performance.now()
  const getTime = () => `${(performance.now() - start).toFixed(2)}ms`
  // 配置文件地址
  let resolvedPath: string | undefined
  // 如果有路径、解析正确的路径
  if (configFile) {
    resolvedPath = path.resolve(configFile)
  } else {
    // 去加载根节点的vite.config.xxx文件地址
    for (const filename of DEFAULT_CONFIG_FILES) {
      const filePath = path.resolve(configRoot, filename)
      if (!fs.existsSync(filePath)) continue
      resolvedPath = filePath
      break
    }
  }
  // 没有配置文件返回null
  if (!resolvedPath) {
    debug('no config file found.')
    return null
  }
  // 判断运行vite的环境 cjs || esm
  let isESM = false
  if (/\.m[jt]s$/.test(resolvedPath)) {
    isESM = true
  } else if (/\.c[jt]s$/.test(resolvedPath)) {
    isESM = false
  } else {
    // 去检查package.json是否存在type = module
    try {
      const pkg = lookupFile(configRoot, ['package.json'])
      isESM = !!pkg && JSON.parse(pkg).type === 'module'
    } catch (e) {}
  }

  try {
    //通过esbuild构建出vite.config.xxx的产物
    const bundled = await bundleConfigFile(resolvedPath, isESM)
    // 拿到产物后获取用户定义的配置
    const userConfig = await loadConfigFromBundledFile(
      resolvedPath,
      bundled.code,
      isESM
    )
    // 输出解析用户的配置所花费的时间
    debug(`bundled config file loaded in ${getTime()}`)
    // 获取最终的用户配置
    const config = await (typeof userConfig === 'function'
      ? userConfig(configEnv)
      : userConfig)
    // 不符合规则的配置直接抛出异常
    if (!isObject(config)) {
      throw new Error(`config must export or return an object.`)
    }
    return {
      // 得到正确的路径
      path: normalizePath(resolvedPath),
      // 用户的配置信息
      config,
      // bundle依赖关系、里面存放的是一些依赖文件路径['xxx/xxx/xx.ts', 'vite.config.ts']
      dependencies: bundled.dependencies
    }
  } catch (e) {
    createLogger(logLevel).error(
      colors.red(`failed to load config from ${resolvedPath}`),
      { error: e }
    )
    throw e
  }
}
/*通过esbuild构建出vite.config.xxx的产物*/
async function bundleConfigFile(
  fileName: string,
  isESM: boolean
): Promise<{ code: string; dependencies: string[] }> {
  const dirnameVarName = '__vite_injected_original_dirname'
  const filenameVarName = '__vite_injected_original_filename'
  const importMetaUrlVarName = '__vite_injected_original_import_meta_url'
  const result = await build({
    absWorkingDir: process.cwd(),
    entryPoints: [fileName],
    outfile: 'out.js',
    write: false,
    target: ['node14.18', 'node16'],
    platform: 'node',
    bundle: true,
    format: isESM ? 'esm' : 'cjs',
    sourcemap: 'inline',
    metafile: true,
    define: {
      __dirname: dirnameVarName,
      __filename: filenameVarName,
      'import.meta.url': importMetaUrlVarName
    },
    plugins: [
      {
        name: 'externalize-deps',
        setup(build) {
          build.onResolve({ filter: /.*/ }, ({ path: id, importer }) => {
            // externalize bare imports
            if (id[0] !== '.' && !path.isAbsolute(id)) {
              return {
                external: true
              }
            }
            // bundle the rest and make sure that the we can also access
            // it's third-party dependencies. externalize if not.
            // monorepo/
            // ├─ package.json
            // ├─ utils.js -----------> bundle (share same node_modules)
            // ├─ vite-project/
            // │  ├─ vite.config.js --> entry
            // │  ├─ package.json
            // ├─ foo-project/
            // │  ├─ utils.js --------> external (has own node_modules)
            // │  ├─ package.json
            const idFsPath = path.resolve(path.dirname(importer), id)
            const idPkgPath = lookupFile(idFsPath, [`package.json`], {
              pathOnly: true
            })
            if (idPkgPath) {
              const idPkgDir = path.dirname(idPkgPath)
              // if this file needs to go up one or more directory to reach the vite config,
              // that means it has it's own node_modules (e.g. foo-project)
              if (path.relative(idPkgDir, fileName).startsWith('..')) {
                return {
                  // normalize actual import after bundled as a single vite config
                  path: isESM ? pathToFileURL(idFsPath).href : idFsPath,
                  external: true
                }
              }
            }
          })
        }
      },
      {
        name: 'inject-file-scope-variables',
        setup(build) {
          build.onLoad({ filter: /\.[cm]?[jt]s$/ }, async (args) => {
            const contents = await fs.promises.readFile(args.path, 'utf8')
            const injectValues =
              `const ${dirnameVarName} = ${JSON.stringify(
                path.dirname(args.path)
              )};` +
              `const ${filenameVarName} = ${JSON.stringify(args.path)};` +
              `const ${importMetaUrlVarName} = ${JSON.stringify(
                pathToFileURL(args.path).href
              )};`

            return {
              loader: args.path.endsWith('ts') ? 'ts' : 'js',
              contents: injectValues + contents
            }
          })
        }
      }
    ]
  })
  const { text } = result.outputFiles[0]
  return {
    code: text,
    dependencies: result.metafile ? Object.keys(result.metafile.inputs) : []
  }
}

interface NodeModuleWithCompile extends NodeModule {
  _compile(code: string, filename: string): any
}
/*  _require: 对于在ESM里面的cli、你需要利用require去动态的在业务逻辑里面对cjs文件进行解析编译出结果、这是一种好的方式 */
const _require = createRequire(import.meta.url)
// 加载esbuild构建的产物
async function loadConfigFromBundledFile(
  fileName: string,
  bundledCode: string,
  isESM: boolean
): Promise<UserConfigExport> {
  /*
    如果是isEsm环境直接创建一个临时js文件、并把bundle产物写进文件、最后加载这个文件产物return 出去
  */
  if (isESM) {
    const fileBase = `${fileName}.timestamp-${Date.now()}`
    const fileNameTmp = `${fileBase}.mjs`
    const fileUrl = `${pathToFileURL(fileBase)}.mjs`
    fs.writeFileSync(fileNameTmp, bundledCode)
    try {
      // 直接通过import(filePath)的方式把临时地址的js导出的内容返回出去
      return (await dynamicImport(fileUrl)).default
    } finally {
      try {
        // 用完、删除临时js文件
        fs.unlinkSync(fileNameTmp)
      } catch {
        // 如果同时调用此函数、则删除
      }
    }
  }
  // 对于 cjs，可以通过 `_require.extensions` 注册一个自定义加载器
  else {
    // 获取文件的后缀扩展名
    const extension = path.extname(fileName)
    // 读取文件名
    const realFileName = fs.realpathSync(fileName)
    // 判断是否存在、require默认的加载文件类型、如果不存在就使用js(这里估计node也是这样的、如果内置的后缀不存在就会用js代替)
    const loaderExt = extension in _require.extensions ? extension : '.js'
    // 保存require默认加载方法
    const defaultLoader = _require.extensions[loaderExt]! // !: 是非null和非undefined的类型断言
    // 重写require的加载方式
    _require.extensions[loaderExt] = (module: NodeModule, filename: string) => {
      // 确保是同一个文件
      if (filename === realFileName) {
        //  对 js文件进行编译加载、这里涉及node对第三方js的加载编译流程了、需要有这方面的知识储备才行
        ;(module as NodeModuleWithCompile)._compile(bundledCode, filename)
      } else {
        defaultLoader(module, filename)
      }
    }
    // 在服务器重启的时候需要清除掉缓存
    delete _require.cache[_require.resolve(fileName)]
    // 加载内容
    const raw = _require(fileName)
    // 用完后把require的加载方式重置回去
    _require.extensions[loaderExt] = defaultLoader
    // 返回结果
    return raw.__esModule ? raw.default : raw
  }
}
/* 执行插件队列中带有handler的方法、目的是为了往修改配置 */
async function runConfigHook(
  config: InlineConfig,
  plugins: Plugin[],
  configEnv: ConfigEnv
): Promise<InlineConfig> {
  let conf = config

  for (const p of getSortedPluginsByHook('config', plugins)) {
    const hook = p.config
    const handler = hook && 'handler' in hook ? hook.handler : hook
    if (handler) {
      const res = await handler(conf, configEnv)
      if (res) {
        conf = mergeConfig(conf, res)
      }
    }
  }

  return conf
}

export function getDepOptimizationConfig(
  config: ResolvedConfig,
  ssr: boolean
): DepOptimizationConfig {
  return ssr ? config.ssr.optimizeDeps : config.optimizeDeps
}
export function isDepsOptimizerEnabled(
  config: ResolvedConfig,
  ssr: boolean
): boolean {
  const { command } = config
  const { disabled } = getDepOptimizationConfig(config, ssr)
  return !(
    disabled === true ||
    (command === 'build' && disabled === 'build') ||
    (command === 'serve' && disabled === 'dev')
  )
}
