module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"indent": [2,'tab', {"SwitchCase": 1}],
		"react/jsx-uses-react": [2],
		"react/jsx-uses-vars": [2],
		"no-case-declarations": 0,
		"no-console": 0
	}
};