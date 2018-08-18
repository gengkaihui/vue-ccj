'use strict'

const path = require('path')

module.exports = {
  dev: {//开发环境

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/sliders': {
        target: 'http://localhost:3000/',//目标url地址
        changeOrigin: true,//指示是否跨域
        pathRewrite: {
          '^/': '/'//可以使用 /sliders 等价于 http://localhost:3000/sliders
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // 可以被process.env.HOST写覆盖
    port: 8080, //可以被process.env.PORT写覆盖, 如果端口被占用，将会使用一个空闲的端口
    autoOpenBrowser: false,//是否自动打开浏览器
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {//生产环境
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,// 是否开启 gzip
    productionGzipExtensions: ['js', 'css'],// 需要压缩的文件

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
