# Dashboard Plugin
Dashboard Plugin is a starter project for developing Dashboard plugins that contains all the tools you need for writing awesome plugins.

## Prerequisites
* Node - http://blog.teamtreehouse.com/install-node-js-npm-mac (A nice tutorial by Team Tree House for installing Node and NPM).

## Setup
    npm install

## Build
    > Build development package
    npm run build

    > Build production package
    npm run build:prod

## Upload S3
    npm run upload:s3 accessKeyId="YOUR_ACCESS_KEY_ID" secretAccessKey="YOUR_SECRET_ACCESS_KEY" bucket="YOUR_BUCKET"

The plugin id from the manifest file will be added as part of the key. Example:
    se-infomaker-dashboard-plugin/manifest.json

So your plugin manifest path will be:
    S3_URL_PATH/se-infomaker-dashboard-plugin/manifest.json

## License
Dashboard Plugin is released under the [MIT](http://www.opensource.org/licenses/MIT) License.
