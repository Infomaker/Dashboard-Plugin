'use strict'

const prompt = require('prompt')
const colors = require("colors/safe")
const fs = require('fs')
let manifest_template = require('./manifest_template.json')

const manifestSchema = {
	properties: {
		name: {
			description: colors.green('Enter your Plugin name'),
			message: colors.red('Invalid plugin name'),
			required: true
		},
		bundle: {
			description: colors.green('Enter your Plugin bundle'),
			pattern: /^\w{2,}[.][\w-]{1,}[.][\w-]{2,}$/g,
			message: colors.red('Invalid bundle. \nPlugin bundle must be reverse domain style, example: "se.infomaker.dashboard-plugin"'),
			required: true
		}
	}
}

fs.readFile('./manifest.json', (err, data) => {
	if (err) {
		prompt.stop = () => {
			if (prompt.stopped || !prompt.started) {
				return
			}
	
			prompt.emit('stop')
			prompt.stopped = true
			prompt.started = false
			prompt.paused = false
			
			return prompt
		}

		console.log(colors.yellow('Dashboard Plugin setup. Follow the setup to create a manifest.json. These values can be changed in the manifest at a later time after the setup.\n'))
	
		prompt.start()
	
		prompt.get(manifestSchema, (err, result) => {
			console.log('\n')
			console.log(`\t ${colors.cyan('Plugin Name: ' + result.name)}`)
			console.log(`\t ${colors.cyan('Plugin Bundle: ' + result.bundle)}`)
			console.log('\n')

			manifest_template.name = result.name
			manifest_template.bundle = result.bundle
		
			fs.writeFile('./manifest.json', JSON.stringify(manifest_template, null, 4), 'utf8', err => {
				if (!err) {
					console.log(`\t ${colors.bgWhite(colors.black("------------------------------------"))}`)
					console.log(`\t ${colors.bgWhite(colors.black('🎉 manifest file has been updated 🎉'))}`)
					console.log(`\t ${colors.bgWhite(colors.black("------------------------------------"))}`)
				} else {
					console.log('Failed to update manifest.json')
				}
			})
	
			prompt.stop()
		})
	} else {
		return
	}
})