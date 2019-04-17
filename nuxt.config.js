const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: '安全教育平台助手',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '安全教育平台助手 支持全国安全教育平台自动完成 方便快捷' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.loli.net/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'icon', type: 'image/x-icon', href:'/favicon.ico'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#ff69b4' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
