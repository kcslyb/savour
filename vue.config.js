// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ConsolePlugin = require('vconsole-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionPlugin = require('compression-webpack-plugin') // Gzip
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageName = require('./package.json').name

module.exports = {
  publicPath: '/',
  outputDir: 'savour',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 以多页模式构建应用程序。
  pages: undefined,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  // 配置跨域请求头，解决开发环境的跨域问题
  devServer: {
    port: 8021,
    https: false,
    historyApiFallback: true,
    disableHostCheck: true,
    // 配置自动启动浏览器
    open: false,
    // 热更新
    hotOnly: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8088',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/' // 删除基本路径
        }
      }
    }
  },

  // webpack配置
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return options
      })
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|ico)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        name: path.join('../main/static/', 'img/[name].[ext]')
      })
  },
  configureWebpack: config => {
    const pluginsPublic = []
    const pluginsPro = [
      new CompressionPlugin({ // 文件开启Gzip，也可以通过服务端filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 8192,
        minRatio: 0.8
      })
    ]
    const pluginsDev = [
      new ConsolePlugin({
        filter: [], // 需要过滤的入口文件
        enable: false // 发布代码前记得改回 false
      })
    ]
    if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      config.plugins = [...config.plugins, ...pluginsPro, ...pluginsPublic]
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsDev, ...pluginsPublic]
    }
    return {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src')
        }
      },
      output: {
        // 微应用的包名，这里与主应用中注册的微应用名称一致
        library: `${packageName}`,
        // 将你的 library 暴露为所有的模块定义下都可运行的方式
        libraryTarget: 'umd',
        // 按需加载相关，设置为 webpackJsonp_VueMicroApp 即可
        jsonpFunction: `webpackJsonp_${packageName}`
      }
    }
  },
  css: {
    loaderOptions: {}
  }
}
