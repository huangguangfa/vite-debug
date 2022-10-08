/*
 * @constant 空类型默认
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const EMPTY_FUNC = function () {}
export const EMPTY_ARRAY = []
export const EMPTY_OBJECT = {}

/*
 * @constant 请求方法常量
 */
export const REQUEST_METHOD = {
  get: 'get',
  post: 'post',
  put: 'put',
  patch: 'patch',
  del: 'delete'
}

/*
 * @constant 请求数据格式
 */
export const CONTENT_TYPE = {
  encoded: 'application/x-www-form-urlencoded',
  json: 'application/json',
  form: 'multipart/form-data',
  html: 'text/html'
}

/*
 * @constant 请求默认配置
 */
export const DEFAULT_REQUEST_OPTIONS = {
  origin: false,
  timeout: 30000,
  retry: 0,
  method: REQUEST_METHOD.get,
  headers: EMPTY_OBJECT,
  request: EMPTY_FUNC,
  response: EMPTY_FUNC,
  reject: EMPTY_FUNC,
  loading: EMPTY_FUNC,
  result: {
    code: 'code',
    success: 'success',
    data: 'data',
    message: 'message'
  }
}

/*
 * @constant 请求响应配置
 */
export const DEFAULT_RESPONSE_OPTIONS = {
  duration: 3000,
  error: {}
}
