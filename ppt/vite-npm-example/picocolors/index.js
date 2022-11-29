const colors = require('picocolors')
;[
  'dim',
  'cyan',
  'red',
  'yellow',
  'blue',
  'white',
  'gray',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgCyan'
].forEach((type) => {
  const content = `类型【${type}】 , ~~~内容1111~~`
  console.log(colors[type](content))
})
