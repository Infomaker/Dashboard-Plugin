/* globals __dirname process */

process.env.NODE_ENV = "development"

const path = require('path')
const common = require('./webpack.common.js')
const merge = require('webpack-merge')

const cfg = merge(common,
    {
        mode: 'development',
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, "..", "..", "build"),
            publicPath: "/"
        },
        devtool: 'eval-source-map',
        plugins: []
    }
)

module.exports = cfg
