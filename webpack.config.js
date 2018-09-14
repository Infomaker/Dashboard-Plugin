const path = require('path')
const webpack = require('webpack')
const manifest = require('./manifest.json')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
    entry: "./src/js/main.js",
    output: {
        filename: "index.js",
        path: path.join(__dirname, "build")
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.jsx'],
        alias: {
            '@root': path.resolve(__dirname, "src/js/plugin/"),
            '@components': path.resolve(__dirname, "src/js/plugin/components/"),
        }
    },
    externals: {
        "Dashboard": "Dashboard",
        "React": "React",
        "react": "React",
        "ReactDOM": "ReactDOM",
        "react-dom": "ReactDOM"
    },
    module: {
        rules: [
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        failOnWarning: false,
                        failOnError: true
                    }
                }
            },
            {
                enforce: 'pre',
                test: /\.(js|jsx|css)$/,
                loader: 'string-replace-loader',
                exclude: /node_modules/,
                options: {
                    multiple: [
                        {
                            search: '@plugin_bundle_class',
                            replace: manifest.bundle.replace(/\./g, '-'),
                            flags: 'g'
                        },
                        {
                            search: '@plugin_bundle',
                            replace: manifest.bundle,
                            flags: 'g'
                        }
                    ]
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader", 
                        options: { 
                            modules: false,
                            importLoaders: 1,
                            sourceMap: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [
                                postcssPresetEnv()
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
                'SC_ATTR': JSON.stringify(`data-${manifest.bundle.replace(/\./g, '-')}`)
            }
        }),
        new CopyWebpackPlugin([
            { from: 'manifest.json', to: '.' }
        ])
    ]
}