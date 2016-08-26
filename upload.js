const AWS = require('aws-sdk')
const fs = require('fs')

console.log("AccessKeyId", process.env.accessKeyId)
console.log("SecretAccessKey", process.env.secretAccessKey)
console.log("Bucket", process.env.bucket)

const s3Bucket = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
})

s3Bucket.upload({
  Bucket: process.env.bucket,
	Key: "index.js",
	Body: fs.readFileSync("build/index.js"),
  ContentType: "text/javascript",
  ContentEncoding: "UTF-8"
}, (err, data) => {
  	if (err) {
  	console.log("error", err, err.stack)
  } else {
  	console.log("Plugin was successfully uploaded to " + process.env.bucket)
  }
})
