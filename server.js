/*
|--------------------------------------------------------------------------
| Server.js
|--------------------------------------------------------------------------
|
| This is your local server. Kickstart it by running npm server and it will serve your plugin so that you can install it
| on dev.dashboard.infomaker.io.
|
*/

'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').Server(app)
const manifest = require('./manifest.json')
const ip = require('ip')

const PORT = process.env.PORT || 7000

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token")
	res.header("Access-Control-Allow-Methods", "DELETE, GET, HEAD, POST, PUT, OPTIONS, TRACE")

	if (req.url.match(/(manifest.json)$/)) {
		res.header("Content-Type", "application/json; charset=utf-8")
	}

	next()
})

app.use(cors())

app.use(express.static(__dirname + '/build'))

http.listen(PORT, () => console.log("\n🎉  " + manifest.name + " manifest.json served at " + "http://" + ip.address() + ":" + PORT + "/manifest.json\nUse this url to install the plugin at http://dev.dashboard.infomaker.io"))