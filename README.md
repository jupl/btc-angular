# Cordova Brunch

## Introduction
Cordova Brunch is a base skeleton for building web applications. In additional to assembling standard web-based application, this skeleton can also assemble native applications using Cordova. (Currently supports iOS and Android applications) While [Brunch](http://brunch.io) can be used to run commands, tasks are also supplied via cake. For a more complete skeleton, see [Cordova Brunch (feat. Chapless Brunch)](https://github.com/jupl/cordova-brunch/tree/chapless) for a skeleton with Chaplin.


## Requirements
* [node.js](http://nodejs.org) (mandatory)
* [CoffeeScript](http://coffeescript.org/#installation) (recommended via npm)


## Setup
1. Install node.js.
2. While not mandatory, it is recommended to install CoffeeScript.
3. Download this skeleton.
4. Open a Terminal / Command Prompt and navigate to this directory where you downloaded the skeleton.
5. Execute the command `npm install` to install all package dependencies.


## Command List
While Brunch commands can be used, cake commands are provided for this skeleton. These tasks can be executed using cake if it is installed. (`cake [command]`) If cake is not installed these commands can also be executed using npm. (`npm run-script [command]`) These are the following commands (this list is accessible using either the command `cake` or `npm start`):

### Cordova
These commands are to set up and initialize native projects that use Cordova to wrap your web application in a native app.

#### `cordova:ios`
Set up XCode project for an iOS app

#### `cordova:android`
Set up Eclipse-friendly project for an Android app

### Building
These commands are used to assemble the application, generating the necessary JS/CSS and adding assets.
* `[env]` The enviroment to build for. Use `web` to build a regular web application under `build/web/`. Use `ios`/`android` to build the web part of the Cordova application and add it to its respective native project under `build/[env]` (assuming you ran the `cordova:` command above).
* `[mode]` Use `dev` mode to keep readable JS/CSS and include tests under the `test/` folder. Use `prod` mode to minify/uglify JS/CSS and omit tests.

#### `build:[env]:[mode]`
Assemble the application once.

#### `watch:[env]:[mode]`
Assemble the application and continue to watch for changes. Rebuild every time a change is detected.

#### `server:[mode]`
Assemble the application and continue to watch for changes. Rebuild every time a change is detected. Also, the application is served locally to open with a browser. This build uses the `web` environment.

### Testing
Use the `test` command to execute tests in the terminal using jsdom.

## Details

### Core
* [Brunch](http://brunch.io) 1.5.3
* [Cordova](http://cordova.apache.org) 2.3.0