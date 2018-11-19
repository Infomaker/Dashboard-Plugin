process.env.NODE_ENV = "production"

const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const common = require('./webpack.common.js')
const merge = require('webpack-merge')


module.exports = merge(common,
    {
        mode: 'production',
        output: {
            filename: "dist.js",
            path: path.resolve(__dirname, "..", "..", "dist"),
            publicPath: "/"
        },
        devtool: 'source-map',
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                })
            ]
        },
        plugins: []
    }
)
