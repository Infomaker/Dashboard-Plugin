const AWS = require('aws-sdk')
const fs = require('fs')
const exec = require('child_process').exec
const manifest = require('./manifest.json')

const expectedArgs = ["bucket", "accessKeyId", "secretAccessKey"]

const print = function(msg, noError) {
  exec('bash ' + __dirname + '/print.sh ' + "'" + msg + "'" + ' ' + (noError ? false : true), function (error, stdout, stderr) {
    console.log(stdout)
  });
}

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
  print("Failed to upload plugin, missing arg accessKeyId", false)
  return false
} else if (!args.secretAccessKey) {
  print("Failed to upload plugin, missing arg secretAccessKey", false)
  return false
} else if (!args.bucket) {
  print("Failed to upload plugin, missing arg bucket", false)
  return false
}

const s3Bucket = new AWS.S3({
  accessKeyId: args.accessKeyId,
  secretAccessKey: args.secretAccessKey,
})

const pluginName = manifest.name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).replace(/\s/g, '')
const baseKey = manifest.id.replace(/\./g, '-').toLowerCase()

s3Bucket.upload({
  Bucket: args.bucket,
  Key: baseKey + "/index.js",
  Body: fs.readFileSync("dist/index.js"),
  ContentType: "text/javascript",
  ContentEncoding: "UTF-8",
  ACL: 'public-read'
}, (err, data) => {
    if (err) {
    print(err, false)
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
          print(err, false)
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
            print(err, false)
          } else {
            console.log("> uploaded manifest > " + data.Location + "\n")

            const path = data.Location.replace("/manifest.json", "")

            print("Successfully uploaded " + manifest.name + " to " + path, true)
          }
        })
      }
    })
  }
})
