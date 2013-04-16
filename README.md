# Cordova Brunch 0.1.2

## Introduction

Cordova Brunch is a base skeleton for building web applications. In additional to assembling standard web-based application, this skeleton can also assemble native applications using Cordova. (Currently supports iOS and Android applications) While [Brunch](http://brunch.io) can be used to run commands, tasks are also supplied via cake. For complete skeletons that include Cordova Brunch see:
- [Chapless Brunch](https://github.com/jupl/chapless-brunch/tree/cordova)
- [Cinder Brunch](https://github.com/jupl/cinder-brunch/tree/cordova)

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
While Brunch/Scaffolt commands can be used, cake commands are provided for this skeleton. These tasks can be executed using cake if it is installed. (`cake [command]`) If cake is not installed these commands can also be executed using npm. (`npm run-script [command]`) These are the following commands (this list is accessible using either the command `cake` or `npm start`):

### Extras
These commands add additional features/items to the project that are not included by default.

#### `add:fastclick` / `rem:fastclick`
Add/remove FastClick to/from the project for optimized click events in touch devices. Visit the [GitHub page](https://github.com/ftlabs/fastclick) for more information and instructions.

### Cordova
These commands are to set up and initialize native projects that use Cordova to wrap your web application in a native app. `[platform]` denotes the application platform to build under. (Currently supporting `ios` and `android`) If you need access to the Cordova JavaScript from your page use the script tag: `<script src="cordova.js"></script>`

#### `cordova:init`
Create a new Cordova project using [cordova-cli](https://github.com/apache/cordova-cli).
* When creating a project, you will be prompted for a package name and app name. (If anything is not provided, Cordova defaults will be used.)
* Project will reside in `build/cordova`.
* Cordova-specific files are added to `app/assets`. (These files will be ignored if a non-Cordova web build is made.) Do not remove these files.
* It is recommended for your web app to not depend on any files in `app/assets/res`.

#### `cordova:add:[platform]`, `cordova:rem:[platform]`
Add/remove specified platform support to the Cordova project.

### Building
These commands are used to assemble the application, generating the necessary JS/CSS and adding assets.
* `[platform]` denotes the application platform to build under. (Currently supporting `ios` and `android`)
* `[mode]` Use `dev` mode to keep readable JS/CSS and include tests under the `test/` folder. Use `prod` mode to minify/uglify JS/CSS and omit tests.

#### `build:web:[mode]`, `build:[platform]:[mode]`
Assemble the application once. If a Cordova build is made, it will also compile for the specified platform.

#### `watch:web:[mode]`, `watch:cordova:[mode]`
Assemble the application and continue to watch for changes. Rebuild every time a change is detected.

#### `server:[mode]`
Assemble the application and continue to watch for changes. Rebuild every time a change is detected. Also, the application is served locally to open with a browser. This build uses the `web` environment.

#### `emulate:[platform]:[mode]`
Assemble the application, compile, and deploy to an emulator for the specified platform.

**NOTE**: [ios-sim](https://github.com/phonegap/ios-sim) is required to emulate on the iOS Simulator.

## Details

### Core
* [Brunch](http://brunch.io) 1.6.3
* [Brunch Toolchain](https://github.com/jupl/brunch-toolchain) 0.1.3
* [Cordova](http://cordova.apache.org) 2.6.0

### Utilities
* [FastClick](https://github.com/ftlabs/fastclick) 0.6.3
