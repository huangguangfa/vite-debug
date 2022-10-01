import type { Server } from 'node:http'
import { STATUS_CODES } from 'node:http'
import type { ServerOptions as HttpsServerOptions } from 'node:https'
import { createServer as createHttpsServer } from 'node:https'
import type { Socket } from 'node:net'
import colors from 'picocolors'
import type { ServerOptions, WebSocket as WebSocketRaw } from 'ws'
import { WebSocketServer as WebSocketServerRaw } from 'ws'
import type { WebSocket as WebSocketTypes } from 'types/ws'
import type { CustomPayload, ErrorPayload, HMRPayload } from 'types/hmrPayload'
import type { InferCustomEventPayload } from 'types/customEvent'
import type { ResolvedConfig } from '..'
import { isObject } from '../utils'

export const HMR_HEADER = 'vite-hmr'

export type WebSocketCustomListener<T> = (
  data: T,
  client: WebSocketClient
) => void

export interface WebSocketServer {
  /**
   * Get all connected clients.
   */
  clients: Set<WebSocketClient>
  /**
   * Broadcast events to all clients
   */
  send(payload: HMRPayload): void
  /**
   * Send custom event
   */
  send<T extends string>(event: T, payload?: InferCustomEventPayload<T>): void
  /**
   * Disconnect all clients and terminate the server.
   */
  close(): Promise<void>
  /**
   * Handle custom event emitted by `import.meta.hot.send`
   */
  on: WebSocketTypes.Server['on'] & {
    <T extends string>(
      event: T,
      listener: WebSocketCustomListener<InferCustomEventPayload<T>>
    ): void
  }
  /**
   * Unregister event listener.
   */
  off: WebSocketTypes.Server['off'] & {
    (event: string, listener: Function): void
  }
}

export interface WebSocketClient {
  /**
   * Send event to the client
   */
  send(payload: HMRPayload): void
  /**
   * Send custom event
   */
  send(event: string, payload?: CustomPayload['data']): void
  /**
   * The raw WebSocket instance
   * @advanced
   */
  socket: WebSocketTypes
}

const wsServerEvents = [
  'connection',
  'error',
  'headers',
  'listening',
  'message'
]

export function createWebSocketServer(
  server: Server | null,
  config: ResolvedConfig,
  httpsOptions?: HttpsServerOptions
): WebSocketServer {
  let wss: WebSocketServerRaw
  let httpsServer: Server | undefined = undefined
  // 热更新配置、判断是否是一个对象 https://cn.vitejs.dev/config/server-options.html#server-hmr
  const hmr = isObject(config.server.hmr) && config.server.hmr
  // 获取用户的websocket（默认都是使用vite自己的）
  const hmrServer = hmr && hmr.server
  // 自定义websocket端口
  const hmrPort = hmr && hmr.port
  // TODO: the main server port may not have been chosen yet as it may use the next available
  const portsAreCompatible = !hmrPort || hmrPort === config.server.port
  // 如果不定制 hmr.server 使用同一个httpServe服务(大部分是不会定制的)
  const wsServer = hmrServer || (portsAreCompatible && server)
  // 自定义连接池
  const customListeners = new Map<string, Set<WebSocketCustomListener<any>>>()
  // 客户连接池
  const clientsMap = new WeakMap<WebSocketRaw, WebSocketClient>()
  if (wsServer) {
    // 创建websocket服务
    wss = new WebSocketServerRaw({ noServer: true })
    // 客户端使用http连接socket触发、换发起协议升级请求、给http服务端发送升级成websocket请求
    wsServer.on('upgrade', (req, socket, head) => {
      // 判断请求是否存在 req.headers['sec-websocket-protocol'] === 'vite-hmr'
      if (req.headers['sec-websocket-protocol'] === HMR_HEADER) {
        // 把http服务升级为ws
        wss.handleUpgrade(req, socket as Socket, head, (ws) => {
          // 升级成功、出发连接成功事件
          wss.emit('connection', ws, req)
        })
      }
    })
  } else {
    const websocketServerOptions: ServerOptions = {}
    const port = hmrPort || 24678
    const host = (hmr && hmr.host) || undefined
    if (httpsOptions) {
      // if we're serving the middlewares over https, the ws library doesn't support automatically creating an https server, so we need to do it ourselves
      // create an inline https server and mount the websocket server to it
      httpsServer = createHttpsServer(httpsOptions, (req, res) => {
        const statusCode = 426
        const body = STATUS_CODES[statusCode]
        if (!body)
          throw new Error(
            `No body text found for the ${statusCode} status code`
          )

        res.writeHead(statusCode, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        })
        res.end(body)
      })

      httpsServer.listen(port, host)
      websocketServerOptions.server = httpsServer
    } else {
      // we don't need to serve over https, just let ws handle its own server
      websocketServerOptions.port = port
      if (host) {
        websocketServerOptions.host = host
      }
    }

    // vite dev server in middleware mode
    wss = new WebSocketServerRaw(websocketServerOptions)
  }

  wss.on('connection', (socket) => {
    // 接收浏览器发送过来的消息
    socket.on('message', (raw) => {
      if (!customListeners.size) return
      let parsed: any
      try {
        parsed = JSON.parse(String(raw))
      } catch {}
      // 不是自定义类型不做处理
      if (!parsed || parsed.type !== 'custom' || !parsed.event) return
      // 获取服务端已经监听的自定义ws事件
      const listeners = customListeners.get(parsed.event)
      if (!listeners?.size) return
      // 获取当前连接客户端
      const client = getSocketClient(socket)
      listeners.forEach((listener) => listener(parsed.data, client))
    })
    // 当客户端连接成功后、服务端给客户端发送一个type=connected的消息
    socket.send(JSON.stringify({ type: 'connected' }))
    if (bufferedError) {
      socket.send(JSON.stringify(bufferedError))
      bufferedError = null
    }
  })
  // wss错误回调
  wss.on('error', (e: Error & { code: string }) => {
    if (e.code === 'EADDRINUSE') {
      config.logger.error(
        colors.red(`WebSocket server error: Port is already in use`),
        { error: e }
      )
    } else {
      config.logger.error(
        colors.red(`WebSocket server error:\n${e.stack || e.message}`),
        { error: e }
      )
    }
  })

  // 为 ws 客户端提供一个包装器，以便我们可以发送 JSON 格式的消息
  // 与 server.ws.send 保持一致
  function getSocketClient(socket: WebSocketRaw) {
    if (!clientsMap.has(socket)) {
      clientsMap.set(socket, {
        send: (...args) => {
          let payload: HMRPayload
          if (typeof args[0] === 'string') {
            payload = {
              type: 'custom',
              event: args[0],
              data: args[1]
            }
          } else {
            payload = args[0]
          }
          socket.send(JSON.stringify(payload))
        },
        socket
      })
    }
    return clientsMap.get(socket)!
  }

  // On page reloads, if a file fails to compile and returns 500, the server
  // sends the error payload before the client connection is established.
  // If we have no open clients, buffer the error and send it to the next
  // connected client.
  let bufferedError: ErrorPayload | null = null
  // 采用闭包的方式保存起ws服务
  return {
    // 监听事件
    on: ((event: string, fn: () => void) => {
      if (wsServerEvents.includes(event)) wss.on(event, fn)
      else {
        if (!customListeners.has(event)) {
          customListeners.set(event, new Set())
        }
        customListeners.get(event)!.add(fn)
      }
    }) as WebSocketServer['on'],
    // 解除事件的监听
    off: ((event: string, fn: () => void) => {
      if (wsServerEvents.includes(event)) {
        wss.off(event, fn)
      } else {
        customListeners.get(event)?.delete(fn)
      }
    }) as WebSocketServer['off'],
    // 返回当前连接的客户列表
    get clients() {
      return new Set(Array.from(wss.clients).map(getSocketClient))
    },
    // 发送消息的封装
    send(...args: any[]) {
      let payload: HMRPayload
      if (typeof args[0] === 'string') {
        payload = {
          type: 'custom',
          event: args[0],
          data: args[1]
        }
      } else {
        payload = args[0]
      }

      if (payload.type === 'error' && !wss.clients.size) {
        bufferedError = payload
        return
      }
      // 发送的数据
      const stringified = JSON.stringify(payload)
      wss.clients.forEach((client) => {
        // 客户端已经连接的都发送一遍
        if (client.readyState === 1) {
          client.send(stringified)
        }
      })
    },
    // 关闭连接
    close() {
      return new Promise((resolve, reject) => {
        wss.clients.forEach((client) => {
          client.terminate()
        })
        wss.close((err) => {
          if (err) {
            reject(err)
          } else {
            if (httpsServer) {
              httpsServer.close((err) => {
                if (err) {
                  reject(err)
                } else {
                  resolve()
                }
              })
            } else {
              resolve()
            }
          }
        })
      })
    }
  }
}
