# Dashboard Plugin
Dashboard Plugin is a starter project for developing Dashboard plugins that contains all the tools you need for writing awesome plugins.

## Prerequisites
* Yarn - https://github.com/yarnpkg/yarn (because npm is so 2016).

## Setup
    yarn

## Build
    > Build development package
    yarn dev

    > Build production package
    yarn build:prod

## Server
	> Serve plugin locally
	yarn server

This will serve your plugin local and that url can be used for install you dev-plugin on dev.dashboard.infomaker.io.

## Upload S3
    yarn upload:s3 accessKeyId="YOUR_ACCESS_KEY_ID" secretAccessKey="YOUR_SECRET_ACCESS_KEY" bucket="YOUR_BUCKET"

This will first execute
	yarn build:prod

The plugin id from the manifest file will be added as part of the key. Example:
    se-infomaker-dashboard-plugin/manifest.json

So your plugin manifest path will be:
    S3_URL_PATH/se-infomaker-dashboard-plugin/manifest.json

## License
Dashboard Plugin is released under the [MIT](http://www.opensource.org/licenses/MIT) License.
