/* globals process, __dirname */

const path = require('path')
const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const webpack = require('webpack')

const rootDir = path.resolve(__dirname, "..", "..")

const cfg = merge(common,
    {
        mode: 'development',
        entry: {
            index:[
                `webpack-hot-middleware/client?path=http://127.0.0.1:${process.env.PORT}/__webpack_hmr`,
                path.resolve(rootDir, "src/js/main.js")
            ]
        },
        output: {
            path: path.resolve(rootDir, "build"),
            filename: "[name].js",
            publicPath: `http://127.0.0.1:${process.env.PORT}/`,
            hotUpdateChunkFilename: "[id].[hash].hot-update.js",
            hotUpdateMainFilename: "[hash].hot-update.json"
        },
        devtool: 'eval-source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
)

module.exports = cfg
