# Brunch Toolchain 0.7.1
[<img src="https://david-dm.org/jupl/brunch-toolchain.png"/>](https://david-dm.org/jupl/brunch-toolchain)
[<img src="https://david-dm.org/jupl/brunch-toolchain/dev-status.png"/>](https://david-dm.org/jupl/brunch-toolchain#info=devDependencies)


## Introduction
This is a toolchain that leverages [node](http://nodejs.org), [Brunch](http://brunch.io), [Scaffolt](https://github.com/paulmillr/scaffolt), [Bower](http://bower.io/), [Jake](https://github.com/mde/jake), and [PhantomJS](http://phantomjs.org/) to provide cross-platform tasks in a simple package. It can be used for skeletons. [EditorConfig](http://editorconfig.org/) is also provided to help with consistency. [Prerender](https://prerender.io/) can be easily enabled/configured for search engine crawling.

For fleshed out skeletons based on this one:
- [Cordova Brunch](https://github.com/jupl/cordova-brunch) (Base skeleton with [Cordova](http://cordova.apache.org/))
- [Aang Brunch](https://github.com/jupl/aang-brunch) ([AngularJS](http://angularjs.org/))
- [Chapless Brunch](https://github.com/jupl/chapless-brunch) ([Chaplin](http://chaplinjs.org/))
- [Cinder Brunch](https://github.com/jupl/cinder-brunch) ([Ember.js](http://emberjs.com/))


## File Structure
    ├── app                 # App is built here. Look at Brunch for more info.
    │   └── assets          # Static files that are just copied
    ├── bower_components    # Packages installed by Bower
    ├── generators          # Generators used by Scaffolt
    ├── jakelib             # Unified set of tasks for development
    ├── public              # Generated final product
    ├── server              # Server configuration
    ├── setup               # Add configuration options to brunch-config
    │   ├── prerender       # Configuration for Prerender server/middleware
    │   └── routes          # Custom routes/services/proxies/etc. (server-side)
    ├── test                # Test-related files
    │   ├── assets          # Static assets to run code tests manually
    │   ├── code            # Code-based tests for Karma/manual
    │   ├── site            # Site-based tests for Mocha and WebDriverJS
    │   ├── karma.conf.js   # Karma configuration for code tests
    │   ├── mocha.opts      # Default options for site tests
    │   └── setup.js        # Configuration for site tests
    ├── vendor              # 3rd party JS/CSS libraries
    ├── .editorconfig       # EditorConfig definition file for coding styles
    ├── bower.json          # Listing for Bower dependencies to download
    ├── brunch-config.js    # Brunch app build configuration
    └── package.json        # Project dependencies and configuration


## Requirements
- [node.js](http://nodejs.org)
- [Jake](https://github.com/mde/jake#installing-with-npm) (required for development)


## Setup
1. Install node.js.
2. If using Windows and leveraging Bower, install [Git](http://git-scm.com/download/win).
3. If doing development, install Jake.
4. Open a terminal window and navigate to the project directory.
5. Execute the command `npm install` to install all package dependencies.


## Notes
If you want to just run Brunch without using Jake tasks, just use either `web:dev` or `web:prod` for the environment. (ex: `brunch watch --server --env web:prod`)

One-line commands are provided for convenience as well for those that want to start running things as quickly as possible by installing depedencies automatically. Use `npm start` to download non-development packages and run the `server:prod` task. Use `npm test` to download all packages and run the `test:all` task.

Prerender is not enabled by default.
- To enable Prerender edit `server/index.js`.
- To modify Prerender server see `prerender/server.js`.
- To modify Prerender middleware see `prerender/index.js`.
- For more information visit their [website](https://prerender.io/).


## Task List
While Brunch/Scaffolt/etc. can be used, Jake commands are provided for a simple and consistent interface. These tasks can be executed using `jake`. (`jake [task]`) These are the following available tasks provided out of the box:


### NPM

#### `npm:clean`
Remove downloaded Node modules. This is useful if you want to reinstall dependencies. (ex. updated/corrupted package(s)) Remember that you need to call `npm install` to install dependencies.


### Bower

#### `bower:install`
Download and preinstall any Bower dependencies in advance. You can run this if you want to download Bower dependencies in advance.

#### `bower:clean`
Remove downloaded Bower dependencies. This is useful if you want to reinstall dependencies. (ex. updated/corrupted package(s))


### Extras
These commands add additional features/items to the project that are not included by default.

#### `add:jquery` / `rem:jquery`
Add/remove the ubiquitous library [jQuery](http://jquery.com/) to/from the project.

#### `add:normalize` / `rem:normalize`
Add/remove [normalize.css](http://necolas.github.io/normalize.css/) to ensure a consistent starting point in styling between different browsers.


### Scaffolding
Scaffolding commands are available in the form of `gen` and `del`. (syntax ex: `jake gen codetest=user`) Multiple scaffolds can be specified in a single command, as well as separating names with commas. (ex: `jake gen codetest=test1,test2 sitetest=test3`)

#### `gen` / `del`
List available scaffolds.

#### `gen codetest=[name]` / `del codetest=[name]`
Generate/destroy a test file with the given test name for testing code. (ex: unit testing)

#### `gen sitetest=[name]` / `del sitetest=[name]`
Generate/destroy a test file with the given test name for testing the site. (ex: functional testing)


### Testing
Tests leverage [Mocha](http://visionmedia.github.io/mocha/), [Mocha as Promised](https://github.com/domenic/mocha-as-promised), and [Chai](http://chaijs.com/). Code and site testing is provided. Code testing adds [Sinon](http://sinonjs.org/) and [Sinon-Chai](https://github.com/domenic/sinon-chai).

#### `test:all [codereporter=progress] [sitereporter=spec] [browsers=[browsers]]`
Run all tests listed below once. For more information on reporters see below.

#### `test:code [reporter=progress] [watch=false] [browsers=[browsers]]`
Run code-based tests (ex. unit tests) using Karma. Karma is preconfigured to run with [PhantomJS](http://phantomjs.org/). A Karma reporter can be specified with the `reporter` option. You can also override the browsers to run with with the `browsers` option. (ex: `browsers=Chrome,Firefox,Safari`) If you run this task with `watch=true` Karma will auto-run on file changes. Otherwise by default Karma runs once. You can also run the server while watching files with `watch=server`. In addition, if you run a build (see below) with the `dev` environment the tests are included with a reporter under `test` to run in browsers. (ex. visit `http://locahost:[port]/test`)

#### `test:site [reporter=spec] [watch=false]`
Run site-based tests (ex. system tests) using Mocha, PhantomJS, and WebDriverJS. A Brunch server is started up temporarily to interact with the site. A Mocha reporter can be specified with the `reporter` option. If you run this task with `watch=true` Mocha will auto-run on file changes with [nodemon](http://remy.github.io/nodemon/). Otherwise by default Mocha runs once. The global method `getDriver` is provided to get a setup and built driver. WebDriverJS' use of Promises can be combined with Mocha as Promised to handle asynchronous behavior easily. ex:

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
  });
});
```


### Building
These commands are used to assemble the application, generating the necessary JS/CSS and adding assets. Use `dev` mode to keep readable JS/CSS, plus include source maps as well as tests under the `test` folder. Use `prod` mode to minify/uglify JS/CSS as well as omit source maps and tests. If any Bower dependencies have not been downloaded yet, Bower will first download them.

#### `build:[mode]`
Assemble the application once.

#### `watch:[mode]`
Assemble the application and continue to watch for changes. Rebuild every time a change is detected.

#### `server:[mode]`
Assemble the application and continue to watch for changes. Rebuild every time a change is detected. Also, the application is served locally to open with a browser. [Prerender](https://prerender.io/) server and middleware is set up if enabled. This build uses the `web` environment.


## Libraries

### Core
- [Brunch](http://brunch.io/)
- [Scaffolt](https://github.com/paulmillr/scaffolt)
- [Bower](http://bower.io/)

### Utilities
- [Prerender](https://prerender.io/)

### Testing
- [PhantomJS](http://phantomjs.org/) (using [wrapper](https://github.com/Obvious/phantomjs))
- [Karma](http://karma-runner.github.io/)
- [WebDriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs)
- [nodemon](http://remy.github.io/nodemon/)
- [Mocha](http://visionmedia.github.com/mocha/)
- [Mocha as Promised](https://github.com/domenic/mocha-as-promised)
- [Chai](http://chaijs.com/)
- [Sinon](http://sinonjs.org/)
- [Sinon-Chai](https://github.com/domenic/sinon-chai)
