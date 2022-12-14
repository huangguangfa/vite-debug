import axios from 'axios'
import qs from 'qs'
import type { AxiosInterceptorOptions, AxiosResponse, CancelToken } from 'axios'

import type {
  ExtendAxiosInstance,
  ExtendAxiosRequestConfig,
  HandleMergeOptions,
  Loading,
  Params,
  UserAxiosConfig
} from './types'

import {
  isArray,
  isEmptyArray,
  isEmptyFunction,
  isEmptyObject,
  isObject,
  isString
} from './utils/type'
import {
  CONTENT_TYPE,
  DEFAULT_REQUEST_OPTIONS,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  REQUEST_METHOD
} from './utils/config'
import type { HttpClient } from './index'

function getBaseUrl(base: string) {
  if (isString(base)) {
    return base
  } else {
    return ''
  }
}

function getUrl(url: string, base: string) {
  const baseUrl = getBaseUrl(base)
  url = url.startsWith('/') ? url : `?${url}`
  return `${baseUrl}${url}`
}

export const getInstance = (
  interceptor?: AxiosInterceptorOptions,
  config?: ExtendAxiosRequestConfig
) => {
  const { loading, headers, timeout, request, response, reject, retry } = {
    ...DEFAULT_REQUEST_OPTIONS,
    ...config
  }
  const instance: ExtendAxiosInstance = axios.create({
    timeout
  })
  for (const [key, val] of Object.entries(headers)) {
    instance.defaults.headers.common[key] = val as string
  }
  // axios默认使用encodeURI进行编码，会造成参数中带有敏感字符，所以需要使用encodeURIComponent进行编码
  instance.defaults.paramsSerializer = (params) => {
    return Object.entries(params)
      .reduce((res, [key, val]) => {
        const value: string =
          isObject(val) || isArray(val) ? JSON.stringify(val) : (val as string)
        res += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`
        return res
      }, '')
      .slice(0, -1)
  }
  // 加载器配置
  if (!isEmptyFunction(loading as () => void)) {
    instance.showLoading = (loading as Loading).show
    instance.hideLoading = (loading as Loading).hide
  }
  // 拦截器配置
  if (!isEmptyFunction(request)) {
    instance.interceptors.request.use(request)
  }
  if (!isEmptyFunction(response)) {
    instance.interceptors.response.use(response, reject)
  }
  // 处理重试逻辑
  if (retry > 0) {
    instance.interceptors.response.use(undefined, (err) => {
      const config = err.config
      if (!config || !config.retry) {
        return Promise.reject(err)
      }
      config.__retryCount = config.__retryCount || 0
      if (config.__retryCount >= config.retry) {
        err.failure = true
        err.message = `已重试 ${config.retry} 次, 请求已中止。`
        return Promise.reject(err)
      }
      config.__retryCount += 1
      const backoff = new Promise((resolve) => {
        setTimeout(() => {
          resolve('')
        }, config.retryDelay)
      })
      return backoff.then(() => {
        return instance(config)
      })
    })
  }
  return instance
}

export const getRequest = (
  instance: HttpClient,
  url: string,
  method: string,
  param?: Params,
  config?: UserAxiosConfig
) => {
  const { _param, _config } = handleParam(param, {
    ...instance.config,
    ...config
  })
  const { loading, origin, showLoading = '', hideLoading = '' } = _config
  const options = handleOptions(instance, url, method, _param, _config)
  return new Promise((resolve, reject) => {
    loading && typeof showLoading === 'function' && showLoading()
    instance
      .http(options)
      .then((res: AxiosResponse) => {
        if (res && res.status === 200 && res.data.code === 0) {
          resolve(origin ? res : res.data)
        } else {
          reject(res || '')
        }
      })
      .catch((e) => {
        const info = e.toString()
        const err = {
          Code: -1,
          Message: '请求失败',
          Status: false
        }
        if (info.includes('Network Error')) {
          err.Message = '网络错误!'
          err.Status = true
        } else if (info.includes('timeout of')) {
          err.Message = '请求超时!'
          err.Status = true
        }
        reject(e)
      })
      .finally(
        () => loading && typeof hideLoading === 'function' && hideLoading()
      )
  })
}

export const getMergeRequest = (
  instance: HttpClient,
  options: Array<HandleMergeOptions> = EMPTY_ARRAY
) => {
  const mergeOptions = handleMergeOptions(instance, options)
  if (isEmptyArray(mergeOptions)) return Promise.resolve(EMPTY_OBJECT)
  return new Promise((resolve, reject) => {
    Promise.all(mergeOptions).then(resolve).catch(reject)
  })
}

export const handleParam = (
  param?: Params,
  config?: Params
): {
  _param: Params
  _config: UserAxiosConfig
} => {
  let _param: Params = param || EMPTY_OBJECT
  let _config = config || EMPTY_OBJECT
  if (!config) {
    const { param, ...rest } = _param || EMPTY_OBJECT
    _param = param
    _config = rest
  }
  return { _param, _config }
}

export const handleOptions = (
  instance: HttpClient,
  url: string,
  method: string,
  param: Params,
  config: UserAxiosConfig
) => {
  const options: {
    url?: string
    params?: Params
    data?: object | string
    cancelToken?: CancelToken
    method?: string
  } = {}
  // 处理输入参数
  if (method === REQUEST_METHOD.get) {
    options.params = param
  } else {
    // 处理ContentType
    switch (config.headers && config.headers['Content-Type']) {
      case CONTENT_TYPE.encoded:
        options.data = qs.stringify(param, { arrayFormat: 'brackets' })
        break
      case CONTENT_TYPE.form:
        // eslint-disable-next-line no-case-declarations
        const formData = new FormData()
        for (const [key, val] of Object.entries(param)) {
          formData.append(key, val as string)
        }
        options.data = formData
        break
      default:
        options.data = param
        break
    }
  }
  // 处理取消请求
  options.cancelToken = instance.source.token
  // 请求头条件定制化
  const headers = {}
  Object.assign(headers, config.headers || {})

  return {
    url: getUrl(url, config.base ? config.base : instance.base),
    method,
    headers,
    ...options
  }
}

export const handleMergeOptions = (
  instance: HttpClient,
  options: Array<HandleMergeOptions>
) => {
  if (isEmptyArray(options)) return []
  return options.reduce((r: Array<Promise<unknown>>, s: HandleMergeOptions) => {
    if (!isEmptyObject(s) && isString(s.url) && isObject(s.config)) {
      const { method, param, config } = s.config
      r.push(getRequest(instance, s.url, method, param, config))
      return r
    }
    return r
  }, [])
}
