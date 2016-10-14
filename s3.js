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
const manifest = require('./manifest.json')

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

const s3Bucket = new AWS.S3({
  accessKeyId: args.accessKeyId,
  secretAccessKey: args.secretAccessKey,
})

const pluginName = manifest.name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).replace(/\s/g, '')
const baseKey = manifest.bundle.replace(/\./g, '-').toLowerCase()

s3Bucket.upload({
  Bucket: args.bucket,
  Key: baseKey + "/index.js",
  Body: fs.readFileSync("dist/index.js"),
  ContentType: "text/javascript",
  ContentEncoding: "UTF-8",
  ACL: 'public-read'
}, (err, data) => {
    if (err) {
      console.log("💥  " + err)
  } else {
    console.log("\n> uploaded index > " + data.Location + "\n")

    s3Bucket.upload({
      Bucket: args.bucket,
      Key: baseKey + "/style.css",
      Body: fs.readFileSync("dist/style.css"),
      ContentType: "text/css",
      ContentEncoding: "UTF-8",
      ACL: 'public-read'
    }, (err, data) => {
        if (err) {
          console.log("💥  " + err)
      } else {

        console.log("> uploaded style > " + data.Location + "\n")

        s3Bucket.upload({
          Bucket: args.bucket,
          Key: baseKey + "/manifest.json",
          Body: fs.readFileSync("dist/manifest.json"),
          ContentType: "text/css",
          ContentEncoding: "UTF-8",
          ACL: 'public-read'
        }, (err, data) => {
            if (err) {
            console.log("💥  " + err)
          } else {
            console.log("> uploaded manifest > " + data.Location + "\n")

            const path = data.Location.replace("/manifest.json", "")

            console.log("🎉  Successfully uploaded " + manifest.name + " to " + path)
          }
        })
      }
    })
  }
})
