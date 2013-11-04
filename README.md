# Brunch Toolchain 0.4.0

[<img src="https://david-dm.org/jupl/brunch-toolchain.png"/>](https://david-dm.org/jupl/brunch-toolchain)
[<img src="https://david-dm.org/jupl/brunch-toolchain/dev-status.png"/>](https://david-dm.org/jupl/brunch-toolchain#info=devDependencies)


## Introduction

This is a toolchain that leverages [node](http://nodejs.org), [Brunch](http://brunch.io), [Scaffolt](https://github.com/paulmillr/scaffolt), [Bower](http://bower.io/), [Jake](https://github.com/mde/jake), and [PhantomJS](http://phantomjs.org/) to provide cross-platform tasks in a simple package. It can be used for skeletons.


## File Structure

    ├── app                 # App is built here. Look at Brunch for more info.
    │   └── assets          # Static files that are just copied
    ├── bower_components    # Packages installed by Bower
    ├── generators          # Generators used by Scaffolt
    ├── jakelib             # Unified set of tasks for development
    ├── public              # Generated final product
    ├── setup               # Add configuration options to brunch-config
    ├── test                # Test-related files
    │   ├── assets          # Static assets required for code tests
    │   ├── code            # Code-based tests for Mocha PhantomJS
    │   ├── mocha.opts      # Default options for site tests
    │   ├── setup.js        # Configuration for site tests
    │   ├── site            # Site-based tests for Mocha
    │   └── vendor          # Test libraries for code-based tests
    ├── vendor              # 3rd party JS/CSS libraries
    ├── bower.json          # Listing for Bower dependencies to download
    ├── brunch-config.js    # Brunch app build configuration
    └── package.json        # Project dependencies and configuration


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

One-line commands are provided for convenience as well for those that want to start running things as quickly as possible by installing depedencies automatically. Use `npm start` to download non-development packages and run the `server:prod` task. Use `npm test` to download all packages and run the `test:all` task.


## Task List
While Brunch/Scaffolt/etc. can be used, Jake commands are provided for a simple and consistent interface. These tasks can be executed using `jake`. (`jake [task]`) These are the following available tasks provided out of the box:

### Bower

#### `bower:install`
Download and preinstall any Bower dependencies in advance. You can run this if you want to download Bower dependencies in advance.

### Scaffolding

#### `gen:codetest name=[name]` / `del:codetest name=[name]`
Generate/destroy a test file with the given test name for testing code. (ex: unit testing)

#### `gen:sitetest name=[name]` / `del:sitetest name=[name]`
Generate/destroy a test file with the given test name for testing the site. (ex: functional testing)


### Testing
Temporarily spin up a local server with Brunch and run tests, leveraging [PhantomJS](http://phantomjs.org/), [Mocha](http://visionmedia.github.io/mocha/), and [Chai](http://chaijs.com/). Code and site testing is provided. Code testing adds [Sinon](http://sinonjs.org/) and [Sinon-Chai](https://github.com/domenic/sinon-chai), and runs through [mocha-phantomjs](http://metaskills.net/mocha-phantomjs/). Site testing uses [WebDriverJS](https://github.com/camme/webdriverjs).

#### `test:all [reporter=[reporter]]`
Run all tests listed below. Since Mocha is used, the reporter can be specified. (ex: `jake test:all reporter=min`) By default `spec` reporter is used.

#### `test:code [reporter=[reporter]]`
Run code-based tests (ex. unit tests) using mocha-phantomjs. In addition, if you run a build (see below) using `dev` the tests are included with a reporter under `test/` to run in browsers. (ex. visit `http://locahost:[port]/test`)

#### `test:site [reporter=[reporter]]`
Run site-based tests (ex. system tests) using PhantomJS and WebDriverJS. The global method `getDriver` is provided to get a setup and built driver. [Mocha as Promised](https://github.com/domenic/mocha-as-promised) is included to leverage WebDriverJS' use of Promises and handle asynchronous behavior easily. ex:

```js
describe('Sample', function() {
  var driver;

  before(function() {
    driver = getDriver();
  });

  it('Has a proper title', function() {
    return driver.get('http://localhost:3333').then(function() {
      return driver.getTitle();
    })
    .then(function(title) {
      expect(title).to.equal('Brunch Toolchain');
    });
  });

  after(function() {
    driver.quit();
  })
});
```


### Building
These commands are used to assemble the application, generating the necessary JS/CSS and adding assets. Use `dev` mode to keep readable JS/CSS, plus include source maps as well as tests under the `test/` folder. Use `prod` mode to minify/uglify JS/CSS as well as omit source maps and tests. If any Bower dependencies have not been downloaded yet, Bower will first download them.

#### `build:[mode]`
Assemble the application once.

#### `watch:[mode]`
Assemble the application and continue to watch for changes. Rebuild every time a change is detected.

#### `server:[mode]`
Assemble the application and continue to watch for changes. Rebuild every time a change is detected. Also, the application is served locally to open with a browser. This build uses the `web` environment.


## Libraries

### Core
* [Brunch](http://brunch.io)
* [Scaffolt](https://github.com/paulmillr/scaffolt)
* [Bower](http://bower.io/)

### Testing
* [PhantomJS](http://phantomjs.org/) (using [wrapper](https://github.com/Obvious/phantomjs))
* [Mocha PhantomJS](http://metaskills.net/mocha-phantomjs/)
* [WebDriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs)
* [Mocha](http://visionmedia.github.com/mocha/)
* [Mocha as Promised](https://github.com/domenic/mocha-as-promised)
* [Chai](http://chaijs.com/)
* [Sinon](http://sinonjs.org/)
* [Sinon-Chai](https://github.com/domenic/sinon-chai)
