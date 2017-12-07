/*
|--------------------------------------------------------------------------
| Development config file
|--------------------------------------------------------------------------
|
| This is the default webpack development config.
|
*/

const path = require('path')
const webpack = require('webpack')
const manifest = require('./manifest.json')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const autoprefixer = require('autoprefixer')
const colors = require("colors/safe")

console.log('\n')
console.log(`\t ${colors.bgWhite(colors.black(" --------------------------- "))}`)
console.log(`\t ${colors.bgWhite(colors.black("  Plugin development build   "))}`)
console.log(`\t ${colors.bgWhite(colors.black(" --------------------------- "))}`)
console.log('\n')

module.exports = {
		entry: "./src/js/main.js",
		output: {
			filename: "index.js",
			path: "build",
		},
		externals: {
			"Dashboard": "Dashboard",
			"React": "React",
			"react": "React",
			"ReactDOM": "ReactDOM",
			"react-dom": "ReactDOM"
		},
		postcss: [
			autoprefixer({
				browsers: ['last 4 versions']
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
				{
					test: /\.jsx?$/,
					loader: 'eslint',
					exclude: /node_modules/
				},
				{
					test: /index\.jsx$/,
					loader: 'string-replace',
					query: {
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
					test: /style\.scss$/,
					loader: 'string-replace',
					query: {
						multiple: [
							{
								search: '@plugin_bundle_class',
								replace: manifest.bundle.replace(/\./g, '-'),
								flags: 'g'
							}
						]
					}
				}
			]
		},
		cssLoader: {
			modules: false,
			importLoaders: 1,
			sourceMap: true
		},
		eslint: {
			failOnWarning: false,
			failOnError: true
		},
		plugins: [
			new ExtractTextPlugin("style.css"),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('development')
				}
			}),			new CopyWebpackPlugin([
					{ from: 'manifest.json', to: '.' }
			])
		]
}
