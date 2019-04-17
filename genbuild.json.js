let fs = require('fs')
fs.writeFileSync('build.json',JSON.stringify({
    version: require('./package.json').version,
    hash: process.argv[2],
    time: new Date().toString().split('GMT+08')[0]
}))