# 请求模块

#### `基础使用`

```js
import useHttpRequest from '@/hooks/useHttpRequest'
const { $get, $post, $all, $patch, $cancel, $del, $put } = useHttpRequest()

// get
$get('/xxxx', {
  name: '111',
}).then((res) => {
  console.log('data', res)
})

// post
const params = {
  page: 1,
  size: 100,
}
$post('/xxx/xxx', params).then((res) => {
  console.log('结果', res)
})

// .... 不同请求类型根据实际场景使用
```

#### `修改请求参数类型`

```js
import useHttpRequest from '@/hooks/useHttpRequest'
const { $post } = useHttpRequest()
import { CONTENT_TYPE } from '@/config'

// 请求参数类型 (注意只需要改变Content类型，内部自动进行对应类型的数据组装)
const reqConfig = {
  headers: {
    'Content-Type': CONTENT_TYPE.form,
  },
}
$post('/xxx/xxx', params, reqConfig).then((res) => {
  console.log('结果', res)
})
```

#### `自定义请求url`

> 默认请求 base 是/router/rest、可能我们有时候需要变更其他请求的服务器地址

```js
$get(
  '/info',
  {},
  {
    base: 'http://www.baidu.com', // 添加一个重置的base
  }
).then((res) => {
  console.log('结果', res)
})
```

#### `请求取消`

```js
import useHttpRequest from '@/hooks/useHttpRequest'
const { $post, $cancel } = useHttp()
const params = { page: 1, size: 100 }
const reqConfig = { cancel: true }
$post('/xxx', params, reqConfig)
  .then((res) => {
    console.log('结果', res)
  })
  .catch((err) => {
    console.log('err', err)
  })
$cancel('取消请求') // 取消当前时段标记过cancel的所有请求、相比之前h5的方式会简单一点
```

#### `多个并发请求`

```js
import useHttpRequest from '@/hooks/useHttpRequest'
const { $all } = useHttpRequest()

const options = [
  {
    url: '/user/info',
    config: {
      method: 'get',
    },
  },
  {
    url: '/user/list',
    config: {
      method: 'post',
      param: {
        size: 1,
        page: 2,
      },
    },
  },
]
$all(options).then((res) => {
  console.log('结果', res)
})
```