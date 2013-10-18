# Brunch Toolchain 0.3.2

[<img src="https://david-dm.org/jupl/brunch-toolchain.png"/>](https://david-dm.org/jupl/brunch-toolchain)
[<img src="https://david-dm.org/jupl/brunch-toolchain/dev-status.png"/>](https://david-dm.org/jupl/brunch-toolchain#info=devDependencies)


## Introduction

This is a toolchain that leverages [node](http://nodejs.org), [Brunch](http://brunch.io), [Scaffolt](https://github.com/paulmillr/scaffolt), [Bower](http://bower.io/), [Jake](https://github.com/mde/jake), and [PhantomJS](http://phantomjs.org/) to provide cross-platform tasks in a simple package. It can be used for skeletons.


## Requirements
* [node.js](http://nodejs.org)
* [Jake](https://github.com/mde/jake#installing-with-npm) (required for development)


## Setup

1. Install node.js.
2. If doing development, install Jake.
4. Open a terminal window and navigate to the project directory.
5. Execute the command `npm install` to install all package dependencies.


## Notes
If you want to just run Brunch without using Jake tasks, just use either `web:dev` or `web:prod` for the environment. ex: `brunch watch --server --environment web:prod`


## Task List
While Brunch/Scaffolt/etc. can be used, Jake commands are provided for a simple and consistent interface. These tasks can be executed using `jake`. (`jake [task]`) These are the following available tasks provided out of the box:

### Bower

#### `bower:install`
Download and preinstall any Bower dependencies in advance. You can run this if you want to download Bower dependencies in advance.

### Scaffolding

#### `gen:test:code name=[name]` / `del:test:code name=[name]`
Generate/destroy a test file with the given test name for testing code. (ex: unit testing)

#### `gen:test:site name=[name]` / `del:test:site name=[name]`
Generate/destroy a test file with the given test name for testing the site. (ex: functional testing)


### Testing
Temporarily spin up a local server with Brunch and run tests, leveraging [PhantomJS](http://phantomjs.org/), [Mocha](http://visionmedia.github.io/mocha/), and [Chai](http://chaijs.com/). Code and site testing is provided. Code testing adds [Sinon](http://sinonjs.org/) and [Sinon-Chai](https://github.com/domenic/sinon-chai), and runs through [mocha-phantomjs](http://metaskills.net/mocha-phantomjs/). Site testing uses [WebDriverJS](https://github.com/camme/webdriverjs).

#### `test:all [reporter=[reporter]]`
Run all tests listed below. Since Mocha is used, the reporter can be specified. (ex: `jake test:all reporter=min`) By default `spec` reporter is used.

#### `test:code [reporter=[reporter]]`
Run code-based tests (ex. unit tests) using mocha-phantomjs.

#### `test:site [reporter=[reporter]]`
Run site-based tests (ex. system tests) using PhantomJS and WebDriverJS.


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
* [Mocha PhantomJS](http://metaskills.net/mocha-phantomjs/) 3.1.5
* [WebDriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs) 2.35.2
* [Mocha](http://visionmedia.github.com/mocha/) 1.13.0
* [Mocha as Promised](https://github.com/domenic/mocha-as-promised) 1.4.0
* [Chai](http://chaijs.com/) 1.8.1
* [Sinon](http://sinonjs.org/) 1.7.3
* [Sinon-Chai](https://github.com/domenic/sinon-chai) 2.4.0