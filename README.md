# Dashboard Plugin
Dashboard Plugin is a starter project for developing Dashboard plugins that contains all the tools you need for writing awesome plugins.

## Prerequisites
* Node - http://blog.teamtreehouse.com/install-node-js-npm-mac (A nice tutorial by Team Tree House for installing Node and NPM).

## Fork
It is recommended to create a fork of this repository. You can then create a new branch in that forked repository for all of your plugins. To fetch updates and keep your fork in sync you can add this repository as a remote (https://help.github.com/articles/configuring-a-remote-for-a-fork/). It is  easy to fetch and merge updates (https://help.github.com/articles/syncing-a-fork/).

## Setup
    npm install

## Build
    > Build development package
    npm run dev

    > Build production package
    npm run build:prod

## Server
	> Serve plugin locally
	npm run server

This will serve your plugin local and that url can be used for install you dev-plugin on dev.dashboard.infomaker.io.

## Upload S3
    npm run upload:s3 accessKeyId="YOUR_ACCESS_KEY_ID" secretAccessKey="YOUR_SECRET_ACCESS_KEY" bucket="YOUR_BUCKET"

This will first execute
	npm run build:prod

The plugin id from the manifest file will be added as part of the key. Example:
    se-infomaker-dashboard-plugin/manifest.json

So your plugin manifest path will be:
    S3_URL_PATH/se-infomaker-dashboard-plugin/manifest.json

## License
Dashboard Plugin is released under the [MIT](http://www.opensource.org/licenses/MIT) License.
