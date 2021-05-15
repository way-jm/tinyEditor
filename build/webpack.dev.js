/**
 * @description webpack 配置，开发环境
 * @author way
 */

// const path = require('path')
const { smart } = require('webpack-merge')
const CommonConf = require('./webpack.common')
const { distPath } = require('./myPath')

module.exports = smart(CommonConf, {
    mode: 'development',
    output: {
        filename: '[name].js',
        path: distPath,
        library: 'tinyEditor',
        libraryTarget: 'umd',
        libraryExport: 'default',
    },
    devtool: 'eval-source-map',
})
