module.exports = function(api) {
	let presets = [
		'@babel/preset-env',
		'@babel/preset-react'
	]

	let plugins = [
		"babel-plugin-styled-components"
	]

	if (api.env('development')){
		// add development specific presets/plugins here
		
	} else if (api.env('production')) {
		// add production specific presets/plugins here
	}

	return {
		presets,
		plugins
	}
}