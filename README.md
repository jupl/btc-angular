# Cordova Brunch 0.10.2
[![Dependency Status](https://gemnasium.com/jupl/cordova-brunch.png)](https://gemnasium.com/jupl/cordova-brunch)


## Introduction
Cordova Brunch is a base skeleton for building web applications. (Currently supports iOS and Android applications) This is a toolchain that leverages [node](http://nodejs.org), [Brunch](http://brunch.io), [Scaffolt](https://github.com/paulmillr/scaffolt), [Bower](http://bower.io/), and [Jake](https://github.com/mde/jake) to provide cross-platform tasks in a simple package. It can be used for skeletons. In addition to assembling a standard web-based application, this skeleton can also assemble native applications using Cordova.

For complete skeletons that include Cordova Brunch see:
- [Aang Brunch](https://github.com/jupl/aang-brunch/tree/cordova) ([AngularJS](http://angularjs.org/))
- [Chapless Brunch](https://github.com/jupl/chapless-brunch/tree/cordova) ([Chaplin](http://chaplinjs.org/))
- [Cinder Brunch](https://github.com/jupl/cinder-brunch/tree/cordova) ([Ember.js](http://emberjs.com/))


## File Structure
    ├── app                     # Assets/code/styles for the client application
    │   └── assets              # Static files copied without modification
    ├── cordova                 # Cordova project
    ├── generators              # Generators used by Scaffolt
    ├── jakelib                 # Unified set of tasks for development
    ├── public                  # Compiled client-side assets
    ├── server                  # Server configuration
    ├── test                    # Test-related files
    │   ├── code                # Code tests that run with Karma
    │   ├── site                # Site tests that run with WebDriverJS
    │   ├── mocha.opts          # Default options for site testing
    │   └── setup.js            # Initialization for site testing
    ├── vendor                  # Additional 3rd party JS/CSS libraries
    ├── .editorconfig           # EditorConfig definitions for coding styles
    ├── bower.json              # Listing for Bower dependencies to download
    ├── brunch-config.js        # Brunch app build configuration
    ├── karma.conf.js           # Karma runner setup
    └── package.json            # Node project dependencies and configuration


## Requirements
- [node.js](http://nodejs.org)
- [Jake](https://github.com/mde/jake#installing-with-npm) (required for development)
- SDKs for devices to be developed on ([more information](https://github.com/apache/cordova-cli#requirements))


## Setup
1. Install node.js.
2. If using Windows install [Git](http://git-scm.com/download/win).
3. If working on development, install Jake.
4. Open a terminal window and navigate to the project directory.
5. Execute the command `npm install` to install all package dependencies.


## Notes

### `npm start` / `npm test`
One-line commands are provided for convenience as well for those that want to start running things as quickly as possible by installing depedencies automatically. Use `npm start` to download non-development packages and run the `server:prod` task. Use `npm test` to download all packages and run both the `test:install` and `test:all` tasks.

### Server
A basic push state server serving static assets is included by default. You can expand/enhance the server as needed for services and to create a more ambitious application.


## Task List
While Brunch/Scaffolt/etc. can be used, Jake commands are provided for a simple and consistent interface. These tasks can be executed using `jake`. (`jake [task]`) These are the following available tasks provided out of the box:


### NPM

#### `npm:clean`
Remove downloaded Node modules. This is useful if you want to reinstall dependencies. (ex. updated/corrupted package(s)) Remember that you need to call `npm install` to install dependencies.


### Bower

#### `bower:install`
Download and preinstall any Bower dependencies in advance. You can run this if you want to force download Bower dependencies.

#### `bower:clean`
Remove downloaded Bower dependencies. This is useful if you want to reinstall dependencies. (ex. updated/corrupted package(s))


### Extras
These commands add additional features/items to the project that are not included by default.

#### `add:jquery` / `rem:jquery`
Add/remove the ubiquitous library [jQuery](http://jquery.com/) to/from the project.

#### `add:normalize` / `rem:normalize`
Add/remove [normalize.css](http://necolas.github.io/normalize.css/) to ensure a consistent starting point in styling between different browsers.

#### `add:fastclick` / `rem:fastclick`
Add/remove [FastClick](https://github.com/ftlabs/fastclick) to/from the project for optimized click events in touch devices.

#### `add:hammer` / `add:hammerjquery` / `rem:hammer`
Add/remove [Hammer.js](http://eightmedia.github.io/hammer.js/) (standalone or jQuery plugin) to/from the project for touch event handling.

#### `add:devicejs` / `rem:devicejs`
Add/remove [device.js](http://matthewhudson.me/projects/device.js/) to handle different device options in CSS and JavaScript.

**NOTE**: By default reference device.js using `devicejs`, as `device` is used by Cordova.


### Cordova
These commands are to set up and initialize native projects that use Cordova to wrap your web application in a native app. `[device]` denotes the application device to build under. (Currently supporting `ios` and `android`) If you need access to the Cordova JavaScript from your page use the script tag: `<script src="cordova.js"></script>`

#### `cordova:init [package=io.cordova.hellocordova [name=HelloCordova]]`
Generate a new Cordova project using [cordova-cli](https://github.com/apache/cordova-cli).
- Package and name options are optional, which uses the default Cordova options. If you specify `name`, you must also specify `package`.
- Project will reside in `cordova/`. If an existing project exists when running this task, it will be replaced with a new one.
- `config.xml` is added to `app/assets`. (This file will be ignored if a non-Cordova web build is made.) Do not remove this file.

#### `cordova:ls`
List device platforms and plugins the Cordova project currently has.

#### `cordova:add device=[device]` / `cordova:rem device=[device]`
Add/remove specified device support to/from the Cordova project.

#### `cordova:add plugin=[plugin]` / `cordova:rem plugin=[plugin]`
Add/remove a plugin to/from the Cordova project.

#### `cordova:update device=[device]`
Update specified device platform.


### Scaffolding
Scaffolding commands are available in the form of `generate` and `destroy`. (syntax ex: `jake generate codetest=user`) Multiple scaffolds can be specified in a single command, as well as separating names with commas. (ex: `jake generate codetest=test1,test2 sitetest=test3`) The following aliases are also available: `g`, `gen`, `d`, `del`. (ex: `jake g codetest=user`)

#### `generate` / `destroy`
List available scaffolds.

#### `generate codetest=[name]` / `destroy codetest=[name]`
Generate/destroy a test file with the given test name for testing client-side code with Karma.

#### `generate sitetest=[name]` / `destroy sitetest=[name]`
Generate/destroy a test file with the given test name for testing the site with WebDriverJS.


### Testing
Tests leverage [Mocha](http://visionmedia.github.io/mocha/), [Mocha as Promised](https://github.com/domenic/mocha-as-promised), and [Chai](http://chaijs.com/). Code and site testing is provided. Code testing adds [Sinon](http://sinonjs.org/) and [Sinon-Chai](https://github.com/domenic/sinon-chai). If you have not set up your environment for testing you must run the `test:install` task first.

#### `test:install`
Install packages required to run code and site testing. You should only need to run this once, unless the task `npm:clean` has been run or you are aware that testing packages have been updated.

#### `test:all [codereporter=[codereporter]] [sitereporter=[sitereporter]]`
Run all tests listed below once. For more information on reporters see below.

#### `test:code [reporter=[reporter]] [watch=false] [browsersync=false]`
Run code-based tests (ex. unit tests) using Karma. Karma is preconfigured to run with all available browsers on the system. ([PhantomJS](http://phantomjs.org/) is included). Karma reporter can be specified with the `reporter` option. If you run this task with `watch=true` Karma will auto-run on file changes. Otherwise by default Karma runs once. You can also run the server while watching files with `watch=server`, plus use BrowserSync with `browsersync=true`.

#### `test:site [reporter=[reporter]] [watch=false]`
Run site-based tests (ex. system tests) using PhantomJS and WebDriverJS. A server is started up temporarily to interact with the site. A Mocha reporter can be specified with the `reporter` option. If you run this task with `watch=true` Mocha will auto-run on file changes with [nodemon](http://remy.github.io/nodemon/). Otherwise by default Mocha runs once. The global method `getDriver` is provided to get a setup and built driver, while the global property `baseUrl` returns the root site url. (ex. `http://localhost:3333`) WebDriverJS' use of Promises can be combined with Mocha as Promised to handle asynchronous behavior easily. ex:

```js
'use strict';

describe('Sample', function() {
  var driver;

  before(function() {
    driver = getDriver();
  });

  beforeEach(function() {
    return driver.get(baseUrl);
  });

  it('Has a proper title', function() {
    return driver.getTitle().then(function(title) {
      title.should.equal('Cordova Brunch');
    });
  });

  after(function() {
    driver.quit();
  });
});
```


### Building
These commands are used to assemble the application, generating the necessary JS/CSS and adding assets. Use `dev` mode to reload files on change, keep readable JS/CSS, plus include source maps. Use `prod` mode to minify/uglify JS/CSS as well as omit source maps and tests. If any Bower dependencies have not been downloaded yet, Bower will first download them. Specify `device` where applicable to build a native app using Cordova for a specific device.

#### `build:[mode] [device=[device]]`
Assemble the application once. If `device` is specified, then build a native app for a device using Cordova. Otherwise it uses the `web` environment.

#### `watch:[mode]`
Assemble the application and continue to watch for changes. Rebuild every time a change is detected.

#### `server:[mode] [browsersync=false]`
Assemble the application and continue to watch for changes. Rebuild every time a change is detected. Also, the application is served locally to open with a browser. By default in `dev` mode, [auto-reload-brunch](https://github.com/brunch/auto-reload-brunch) is used to reload on changes. If you run the task `server:dev browsersync=true` then [BrowserSync](http://browsersync.io/) is used instead for additional functionality.

#### `emulate:[mode] device=[device]`
Assemble the application, compile, and deploy to an emulator for the specified device.

**NOTE**: [ios-sim](https://github.com/phonegap/ios-sim) is required to run the iOS Simulator.


## Libraries

### Core
- [Brunch Toolchain](https://github.com/jupl/brunch-toolchain) 0.10.2
- [Cordova](http://cordova.apache.org) 3.4

### Utilities
- [FastClick](https://github.com/ftlabs/fastclick)
- [Hammer.js](http://eightmedia.github.io/hammer.js/)
- [device.js](http://matthewhudson.me/projects/device.js/)
