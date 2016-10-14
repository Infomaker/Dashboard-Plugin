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

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token")
	res.header("Access-Control-Allow-Methods", "DELETE, GET, HEAD, POST, PUT, OPTIONS, TRACE")
	next()
})

app.use(cors())

app.use(express.static(__dirname+'/build'))

http.listen(process.env.SERVER_PORT, () => {
  console.log("\n🎉  " + manifest.name + " can now be installed from http://localhost:" + process.env.SERVER_PORT + "\n")
})