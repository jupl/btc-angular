# Brunch Toolchain 0.3.0

## Introduction

This is a toolchain that leverages [node](http://nodejs.org), [Brunch](http://brunch.io), [Scaffolt](https://github.com/paulmillr/scaffolt), [Bower](http://bower.io/), and [cake](http://coffeescript.org/#cake) to provide tasks in a simple package. It can be used for skeletons.


## Requirements
* [node.js](http://nodejs.org) (mandatory)
* [CoffeeScript](http://coffeescript.org/#installation) (optional via npm)


## Setup
1. Install node.js.
2. If you prefer using the `cake` command instead of `npm run-script` (see below) install CoffeeScript.
3. Download this skeleton.
4. Open a Terminal / Command Prompt and navigate to this directory where you downloaded the skeleton.
5. Execute the command `npm install` to install all package dependencies.


## Command List
While Brunch/Scaffolt commands can be used, cake commands are provided for this skeleton. These tasks can be executed using cake if it is installed. (`cake [command]`) If cake is not installed these commands can also be executed using npm. (`npm run-script [command]`) These are the following commands (this list is accessible using either the command `cake` or `npm start`):

### Bower

#### `bower:install`
Download and preinstall any Bower dependencies in advance. You can run this if you want to download Bower dependencies in advance.

### Building
These commands are used to assemble the application, generating the necessary JS/CSS and adding assets. Use `dev` mode to keep readable JS/CSS, plus include source maps as well as tests under the `test/` folder. Use `prod` mode to minify/uglify JS/CSS as well as omit source maps and tests. If any Bower dependencies have not been downloaded yet, Bower will first download them.

#### `build:[mode]`
Assemble the application once.

#### `watch:[mode]`
Assemble the application and continue to watch for changes. Rebuild every time a change is detected.

#### `server:[mode]`
Assemble the application and continue to watch for changes. Rebuild every time a change is detected. Also, the application is served locally to open with a browser. This build uses the `web` environment.


## Details

### Core
* [Brunch](http://brunch.io) 1.7.6
* [Scaffolt](https://github.com/paulmillr/scaffolt) 0.4.0
* [Bower](http://bower.io/) 1.2.6

### Testing
* [Mocha](http://visionmedia.github.com/mocha/) 1.13.0
* [Chai](http://chaijs.com/) 1.8.0
* [Sinon](http://sinonjs.org/) 1.7.3
* [Sinon-Chai](https://github.com/domenic/sinon-chai) 2.4.0
* [Modernizr](http://modernizr.com/) 2.6.2