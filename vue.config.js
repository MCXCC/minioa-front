const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  configureWebpack: {
    resolve: {
      // 给路径起别名
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/LineManage',
        network: '@/network',
        views: '@/views'
      }
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 5532,
    proxy: {
      '/json_demo': {
        // 跨域的服务器地址
        target: 'http://127.0.0.1:5531',
        // 是否允许跨域
        changeOrigin: true,
        // 替换掉请求路径的/json_demo“”
        pathRewrite: { '^/json_demo': '' }
      }
    },
    client: {
      overlay: false
    }
  }
}
