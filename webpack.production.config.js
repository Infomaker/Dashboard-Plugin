/*
|--------------------------------------------------------------------------
| Production config file
|--------------------------------------------------------------------------
|
| This is you webpack production config.
| Please leave it as it is.
|
*/

const path = require('path');
const webpack = require('webpack');
const manifest = require('./manifest.json');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

console.log("\n ----------------------------")
console.log(" Plugin production build ")
console.log(" ----------------------------\n")

module.exports = {
    entry: "./src/js/main.js",
    output: {
        filename: "index.js",
        path: "dist",
    },
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    module: {
        loaders: [
          {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
          },
          {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
          },
          {
              test: /\.jsx?$/,
              exclude: /(node_modules)/,
              loaders: [
                  'babel?presets[]=stage-0,presets[]=react,presets[]=es2015'
              ]
          }
        ],
        preLoaders: [
          { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ },
          {
            test: /index\.jsx$/,
            loader: 'string-replace',
            query: {
              multiple: [
                 { search: '@plugin_bundle', replace: manifest.bundle },
                 { search: '@plugin_name', replace: manifest.name },
                 { search: '@plugin_author', replace: manifest.author },
                 { search: '@graphic_url', replace: manifest.graphic_url },
                 { search: '@plugin_version', replace: manifest.version }
              ]
            }
          }
        ]
    },
    cssLoader: {
        // True enables local scoped css
        modules: false,
        // Which loaders should be applied to @imported resources (How many after the css loader)
        importLoaders: 1,
        sourceMap: false
    },
    eslint: {
        failOnWarning: false,
        failOnError: true
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          minimize: true,
          sourceMap: false,
          output: {
            comments: false
          },
          compress: {
            warnings: false
          }
        }),
        new CopyWebpackPlugin([
            { from: 'manifest.json', to: '.' }
        ])
    ]
};
