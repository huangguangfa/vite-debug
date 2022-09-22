import fs from 'node:fs'
import path from 'node:path'
import history from 'connect-history-api-fallback'
import type { Connect } from 'types/connect'
import { createDebugger } from '../../utils'

export function spaFallbackMiddleware(
  root: string
): Connect.NextHandleFunction {
  const historySpaFallbackMiddleware = history({
    logger: createDebugger('vite:spa-fallback'),
    // support /dir/ without explicit index.html
    rewrites: [
      {
        from: /\/$/,
        to({ parsedUrl }: any) {
          const rewritten =
            decodeURIComponent(parsedUrl.pathname) + 'index.html'

          if (fs.existsSync(path.join(root, rewritten))) {
            return rewritten
          } else {
            return `/index.html`
          }
        }
      }
    ]
  })

  // Keep the named function. The name is visible in debug logs via `DEBUG=connect:dispatcher ...`
  return function viteSpaFallbackMiddleware(req, res, next) {
    return historySpaFallbackMiddleware(req, res, next)
  }
}
