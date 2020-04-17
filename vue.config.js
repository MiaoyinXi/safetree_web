module.exports = {
    configureWebpack: {
        devtool: process.env.NODE_ENV === 'production' ? 'none': 'source-map'
    },
    baseUrl: './'
  }