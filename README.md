# Brunch Toolchain 0.3.2


## Introduction

This is a toolchain that leverages [node](http://nodejs.org), [Brunch](http://brunch.io), [Scaffolt](https://github.com/paulmillr/scaffolt), [Bower](http://bower.io/), and [jake](https://github.com/mde/jake) to provide cross-platform tasks in a simple package. It can be used for skeletons.


## Requirements
* [node.js](http://nodejs.org)
* [jake](https://github.com/mde/jake#installing-with-npm) (for development)


## Setup

1. Install node.js.
2. If doing development, install Jake.
3. Open a terminal window and navigate to the project directory.
4. Execute the command `npm install` to install all package dependencies.


## Notes
If 


## Task List
While Brunch/Scaffolt/etc. can be used, Jake commands are provided for a simple and consistent interface. These tasks can be executed using `jake`. (`cake [task]`) These are the following available tasks provided out of the box:

### Bower

#### `bower:install`
Download and preinstall any Bower dependencies in advance. You can run this if you want to download Bower dependencies in advance.

### Scaffolding

#### `gen:test name=[name]` / `del:test name=[name]`
Generate/destroy a Mocha test file with the given test name.

### Testing
Testing is provided out of the box with Mocha, Chai, Sinon, and Sinon-Chai.

#### `test:phantom [reporter=[reporter]]`
Temporarily spin up a local server with Brunch, then run Mocha tests in PhantomJS using mocha-phantomjs. You can specify a different reporter to use. (ex: `jake test:phantom reporter=min`)

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
* [Brunch](http://brunch.io) 1.7.8
* [Scaffolt](https://github.com/paulmillr/scaffolt) 0.4.2
* [Bower](http://bower.io/) 1.2.7

### Testing
* [PhantomJS](http://phantomjs.org/) 1.9.2 (using [wrapper](https://github.com/Obvious/phantomjs))
* [Mocha](http://visionmedia.github.com/mocha/) 1.13.0
* [Chai](http://chaijs.com/) 1.8.1
* [Sinon](http://sinonjs.org/) 1.7.3
* [Sinon-Chai](https://github.com/domenic/sinon-chai) 2.4.0
* [mocha-phantomjs](http://metaskills.net/mocha-phantomjs/) 3.1.5