import aliasPlugin from '@rollup/plugin-alias'
import type { PluginHookUtils, ResolvedConfig } from '../config'
import { isDepsOptimizerEnabled } from '../config'
import type { HookHandler, Plugin } from '../plugin'
import { getDepsOptimizer } from '../optimizer'
import { shouldExternalizeForSSR } from '../ssr/ssrExternal'
import { jsonPlugin } from './json'
import { resolvePlugin } from './resolve'
import { optimizedDepsBuildPlugin, optimizedDepsPlugin } from './optimizedDeps'
import { esbuildPlugin } from './esbuild'
import { importAnalysisPlugin } from './importAnalysis'
import { cssPlugin, cssPostPlugin } from './css'
import { assetPlugin } from './asset'
import { clientInjectionsPlugin } from './clientInjections'
import { buildHtmlPlugin, htmlInlineProxyPlugin } from './html'
import { wasmFallbackPlugin, wasmHelperPlugin } from './wasm'
import { modulePreloadPolyfillPlugin } from './modulePreloadPolyfill'
import { webWorkerPlugin } from './worker'
import { preAliasPlugin } from './preAlias'
import { definePlugin } from './define'
import { ssrRequireHookPlugin } from './ssrRequireHook'
import { workerImportMetaUrlPlugin } from './workerImportMetaUrl'
import { ensureWatchPlugin } from './ensureWatch'
import { metadataPlugin } from './metadata'
import { dynamicImportVarsPlugin } from './dynamicImportVars'
import { importGlobPlugin } from './importMetaGlob'

// 插件的集合、vite默认使用的一些内部插件
export async function resolvePlugins(
  config: ResolvedConfig,
  prePlugins: Plugin[],
  normalPlugins: Plugin[],
  postPlugins: Plugin[]
): Promise<Plugin[]> {
  // 是否运行build打包
  const isBuild = config.command === 'build'
  // 是否开启watch
  const isWatch = isBuild && !!config.build.watch
  // 把前置插件(pre)和后置(post)插件筛选出来、和vite内置的前后插件
  const buildPlugins = isBuild
    ? (await import('../build')).resolveBuildPlugins(config)
    : { pre: [], post: [] }
  return [
    isWatch ? ensureWatchPlugin() : null,
    isBuild ? metadataPlugin() : null,
    preAliasPlugin(config),
    // 别名配置
    aliasPlugin({ entries: config.resolve.alias }),
    // 把用户自己的前置插件放进来
    ...prePlugins,
    config.build.polyfillModulePreload
      ? modulePreloadPolyfillPlugin(config)
      : null,
    ...(isDepsOptimizerEnabled(config, false) ||
    isDepsOptimizerEnabled(config, true)
      ? [
          isBuild
            ? optimizedDepsBuildPlugin(config)
            : optimizedDepsPlugin(config)
        ]
      : []),
    resolvePlugin({
      ...config.resolve,
      root: config.root,
      isProduction: config.isProduction,
      isBuild,
      packageCache: config.packageCache,
      ssrConfig: config.ssr,
      asSrc: true,
      getDepsOptimizer: (ssr: boolean) => getDepsOptimizer(config, ssr),
      shouldExternalize:
        isBuild && config.build.ssr && config.ssr?.format !== 'cjs'
          ? (id) => shouldExternalizeForSSR(id, config)
          : undefined
    }),
    htmlInlineProxyPlugin(config),
    cssPlugin(config),
    config.esbuild !== false ? esbuildPlugin(config.esbuild) : null,
    jsonPlugin(
      {
        namedExports: true,
        ...config.json
      },
      isBuild
    ),
    wasmHelperPlugin(config),
    webWorkerPlugin(config),
    assetPlugin(config),
    ...normalPlugins,
    wasmFallbackPlugin(),
    definePlugin(config),
    cssPostPlugin(config),
    isBuild && config.build.ssr ? ssrRequireHookPlugin(config) : null,
    isBuild && buildHtmlPlugin(config),
    workerImportMetaUrlPlugin(config),
    ...buildPlugins.pre,
    dynamicImportVarsPlugin(config),
    importGlobPlugin(config),
    ...postPlugins,
    ...buildPlugins.post,
    // internal server-only plugins are always applied after everything else
    ...(isBuild
      ? []
      : // 不是buid
        [clientInjectionsPlugin(config), importAnalysisPlugin(config)])
    // filter是为了排除掉false部分的[fn,0,false].filter(item => Boolean(item))
  ].filter(Boolean) as Plugin[]
}
//
export function createPluginHookUtils(
  plugins: readonly Plugin[]
): PluginHookUtils {
  // 对插件做排序 前置 正常 后置 还做了缓存处理

  const sortedPluginsCache = new Map<keyof Plugin, Plugin[]>()
  function getSortedPlugins(hookName: keyof Plugin): Plugin[] {
    if (sortedPluginsCache.has(hookName))
      return sortedPluginsCache.get(hookName)!
    const sorted = getSortedPluginsByHook(hookName, plugins)
    sortedPluginsCache.set(hookName, sorted)
    return sorted
  }
  // 获取某个hook的所有插件回调
  function getSortedPluginHooks<K extends keyof Plugin>(
    hookName: K
  ): NonNullable<HookHandler<Plugin[K]>>[] {
    const plugins = getSortedPlugins(hookName)
    return plugins
      .map((p) => {
        const hook = p[hookName]!
        // @ts-expect-error cast
        return 'handler' in hook ? hook.handler : hook
      })
      .filter(Boolean)
  }

  return {
    getSortedPlugins,
    getSortedPluginHooks
  }
}

export function getSortedPluginsByHook(
  hookName: keyof Plugin,
  plugins: readonly Plugin[]
): Plugin[] {
  const pre: Plugin[] = []
  const normal: Plugin[] = []
  const post: Plugin[] = []
  for (const plugin of plugins) {
    const hook = plugin[hookName]
    if (hook) {
      if (typeof hook === 'object') {
        if (hook.order === 'pre') {
          pre.push(plugin)
          continue
        }
        if (hook.order === 'post') {
          post.push(plugin)
          continue
        }
      }
      normal.push(plugin)
    }
  }
  return [...pre, ...normal, ...post]
}
