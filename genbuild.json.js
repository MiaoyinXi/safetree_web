let fs = require('fs')
let data = JSON.stringify({
    version: require('./package.json').version,
    hash: process.argv[2],
    time: new Date().toString().split('GMT+08')[0]
})
fs.writeFileSync('build.json',data)
fs.writeFileSync('public/version.json',data)