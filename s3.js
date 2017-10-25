/*
|--------------------------------------------------------------------------
| S3 Bucket Deploy
|--------------------------------------------------------------------------
|
| npm run upload:s3 will build your plugin and upload it to your bucket.
| Read the plugin readme for full details.
|
*/

const AWS = require('aws-sdk')
const fs = require('fs')
const exec = require('child_process').exec
let manifest = require('./manifest.json')

const expectedArgs = ["bucket", "accessKeyId", "secretAccessKey"]

var args = {}

process.argv.forEach(arg => {
	const parts = arg.split("=")

	if (parts[0] && parts[1] && parts.indexOf(parts[0]) > -1) {
		args[parts[0]] = parts[1]
	}
})

console.log("\n ----------------------------")
console.log(" Plugin S3 plugin uploader ")
console.log(" ----------------------------\n")

if (!args.accessKeyId) {
  console.log("💥  Failed to upload plugin, missing arg accessKeyId")
  return false
} else if (!args.secretAccessKey) {
  console.log("💥  Failed to upload plugin, missing arg secretAccessKey")
  return false
} else if (!args.bucket) {
  console.log("💥  Failed to upload plugin, missing arg bucket")
  return false
}

const s3Bucket = new AWS.S3({ accessKeyId: args.accessKeyId, secretAccessKey: args.secretAccessKey })

const pluginName = manifest.name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()}).replace(/\s/g, '')

const versionPaths = manifest.version.split(".")
const bundlePath = manifest.bundle.replace(/\./g, '-').toLowerCase()
const majorVersionPath = versionPaths[0]
const baseKey = `${bundlePath}/v${majorVersionPath}`

fs.readFile('./icon.png', (err, pluginIconData) => {
	const shouldUploadPluginIcon = !err && pluginIconData

	uploadIndexJS().then(location => {
		console.log("\n> uploaded index > " + location + "\n")

		uploadStyleCSS().then(location => console.log("> uploaded style > " + location + "\n")).catch(err => console.log("💥  " + err))

		const uploadManifest = () => {
			uploadManifestJSON().then(location => {
				console.log("> uploaded manifest > " + location + "\n")

				console.log("🎉  Successfully uploaded " + manifest.name + " to " + location.replace("/manifest.json", ""))
			}).catch(err => console.log("💥  " + err))
		}

		if (shouldUploadPluginIcon) {
			uploadPluginIcon(pluginIconData).then(location => {
				console.log("> uploaded plugin icon > " + location + "\n")

				if (manifest.graphic_url != location) {
					manifest.graphic_url = location

					fs.writeFile('./manifest.json', JSON.stringify(manifest, null, 4), 'utf8', err => {
						if (!err) {
							uploadManifest()
						} else {
							console.log("> failed to set manifest graphic url... (will continue to upload manifest) \n")

							uploadManifest()
						}
					})
				} else {
					uploadManifest()
				}
			}).catch(err => console.log("💥  " + err))
		} else {
			uploadManifest()

			if (manifest.graphic_url) {
				delete manifest.graphic_url
				fs.writeFile('./manifest.json', JSON.stringify(manifest, null, 4), 'utf8', () => remove("icon.png"))
			}
		}

	}).catch(err => console.log("💥  " + err))
})

function uploadIndexJS() {
	return new Promise((resolve, reject) => {
		upload({
			resolve: resolve,
			reject: reject,
			key: "index.js",
			data: fs.readFileSync("dist/index.js"),
			contentType: "text/javascript"
		})
	})
}

function uploadStyleCSS() {
	return new Promise((resolve, reject) => {
		upload({
			resolve: resolve,
			reject: reject,
			key: "style.css",
			data: fs.readFileSync("dist/style.css"),
			contentType: "text/css"
		})
	})
}

function uploadPluginIcon(data) {
	return new Promise((resolve, reject) => {
		upload({
			resolve: resolve,
			reject: reject,
			key: "icon.png",
			data: data,
			contentType: "image/png"
		})
	})
}

function uploadManifestJSON() {
	return new Promise((resolve, reject) => {
		upload({
			resolve: resolve,
			reject: reject,
			key: "manifest.json",
			data: fs.readFileSync("dist/manifest.json"),
			contentType: "application/json"
		})
	})
}

function upload(params) {
	s3Bucket.upload({
		Bucket: args.bucket,
		Key: baseKey  + "/" + params.key,
		Body: params.data,
		ContentType: params.contentType,
		ContentEncoding: "UTF-8",
		ACL: "public-read"
	}, (err, data) => err ? params.reject(err) : params.resolve(data.Location))
}

function remove(key) {
	s3Bucket.deleteObject({
		Bucket: args.bucket,
		Key: baseKey + "/" + key
	}, (err, data) => {})
}