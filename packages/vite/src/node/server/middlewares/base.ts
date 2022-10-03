import type { Connect } from 'types/connect'
import type { ViteDevServer } from '..'

// this middleware is only active when (config.base !== '/')

export function baseMiddleware({
  config
}: ViteDevServer): Connect.NextHandleFunction {
  const devBase = config.base

  // Keep the named function. The name is visible in debug logs via `DEBUG=connect:dispatcher ...`
  return function viteBaseMiddleware(req, res, next) {
    const url = req.url!
    const parsed = new URL(url, 'http://vitejs.dev')
    const path = parsed.pathname || '/'

    if (path.startsWith(devBase)) {
      // rewrite url to remove base. this ensures that other middleware does
      // not need to consider base being prepended or not
      req.url = url.replace(devBase, '/')
      return next()
    }

    // skip redirect and error fallback on middleware mode, #4057
    if (config.server.middlewareMode) {
      return next()
    }

    if (path === '/' || path === '/index.html') {
      // 使用搜索和哈希将根访问重定向到基于 url
      res.writeHead(302, {
        Location: devBase + (parsed.search || '') + (parsed.hash || '')
      })
      res.end()
      return
    } else if (req.headers.accept?.includes('text/html')) {
      // non-based page visit
      const redirectPath = devBase + url.slice(1)
      res.writeHead(404, {
        'Content-Type': 'text/html'
      })
      res.end(
        `The server is configured with a public base URL of ${devBase} - ` +
          `did you mean to visit <a href="${redirectPath}">${redirectPath}</a> instead?`
      )
      return
    }

    next()
  }
}
