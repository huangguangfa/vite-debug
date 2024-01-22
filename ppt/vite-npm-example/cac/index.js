const cli = require('cac')()

cli
  .command('createUser [...args]', '获取输入信息') // 声明命令
  .option('--name <n>', '姓名')
  .option('--age <a>', '年龄', { default: 6 })
  .action((args, options) => {
    console.log('配置', options)
    console.log('其他参数', args)
  })

cli.help()
cli.version('0.0.9')
const parsed = cli.parse()

console.log('parsed', parsed)

// node index.js createUser  --name xy --age 18
// node index.js createUser  --name xy
// node index.js createUser Test --name xy
// node index.js -v
