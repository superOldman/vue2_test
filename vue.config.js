const cdn = {
    // 忽略打包的第三方库
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios'
    },

    // 通过cdn方式使用
    js: [
        'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
        // 'https://cdn.bootcss.com/vue/2.6.11/vue.runtime.min.js',
        'https://cdn.bootcss.com/vue-router/3.1.2/vue-router.min.js',
        // 'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
        'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
        // 'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
        // 'https://cdn.bootcss.com/echarts/3.7.1/echarts.min.js'
    ],

    css: []
}
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

module.exports = {
    // 打包输出文件夹
    outputDir: 'vue2_test',
    // 部署应用包时的基本 URL
    // publicPath: process.env.NODE_ENV === 'production' ? 'http://sicilymarmot.top/vue2_test/routeList.json' : './',
    publicPath: './',
    // server 配置
    devServer: {
        host: '0.0.0.0',
        port: 8888,
        open: false,
        // 配置代理
        proxy: {
            '/localhost': {
                target: 'http://localhost:3000',
                // target: 'https://tyunzhentui.71360.com', 
                changeOrigin: true,
                pathRewrite: {
                    '^/localhost': ''
                }
            }
        }
    },
    lintOnSave: false,
    chainWebpack: config => {
        var a = config.module.rule('svg')
        // console.log(config)
        // console.log(a)


        // 配置cdn引入
        config.plugin('html').tap(args => {
            args[0].cdn = cdn
            return args
        })
    },
    configureWebpack: config => {
        config.devtool = 'source-map'
        // console.log('打包配置config', config)
        // 忽略打包配置
        config.externals = cdn.externals

        config.plugins = [
            ...config.plugins,
            new ProgressBarPlugin({
                format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
                clear: false
            })
        ]
    }
}