## vite 的疑惑

- import.meta.env.xxx 为什么这样我们就能拿到配置文件的属性值！
- xxx.vue 和 xxx.ts 是怎么转换成浏览器能够识别的内容！
- css 的 scope 是怎么实现的！
- optimize 指令是干嘛的
- import.meta.glob 他是怎么实现的

- vite 的优化
  - 预构建的 node_modules 包处理
  - node_modules 的包的欲构建合并，目的是为了解决几百个的请求并发
