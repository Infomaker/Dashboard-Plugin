'use strict'

const prompt = require('prompt')
const colors = require("colors/safe")
const fs = require('fs')
let manifest_template = require('./manifest_template.json')

const manifestSchema = {
	properties: {
		name: {
			description: colors.green('Enter your Plugin name'),
			required: true,
			default: manifest_template.name
		},
		bundle: {
			description: colors.green('Enter your Plugin bundle'),
			pattern: /^\w{2,}[.][\w-]{1,}[.][\w-]{2,}$/g,
			message: colors.red('Invalid bundle!\nPlugin bundle must be inverse domain name, example: "se.infomaker.dashboard-plugin"'),
			required: true,
			default: manifest_template.bundle
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

		console.log(colors.yellow('Welcome to Dashboard Plugin, please enter these requirements properties to continue with your Plugin\n'))
	
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
					console.log(`\t ${colors.bgWhite(colors.black("-----------------------------------"))}`)
					console.log(`\t ${colors.bgWhite(colors.black('🎉 manifest file has been updated 🎉.'))}`)
					console.log(`\t ${colors.bgWhite(colors.black("-----------------------------------"))}`)
				} else {
					console.log('Failed to update manifest.json, continue with default values 🚫')
				}
			})
	
			prompt.stop()
		})
	} else {
		return
	}
})