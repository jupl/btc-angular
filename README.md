# [BTC Base](http://jupl.github.io/btc/) 0.10.4
[![Dependency Status](https://gemnasium.com/jupl/btc.png)](https://gemnasium.com/jupl/btc)

This is the base skeleton for the following derived project templates:
- [BTC Serverpack](https://github.com/jupl/btc-serverpack) (Base with server extras)
- [BTC Cordova](https://github.com/jupl/btc-cordova) (Base with [Cordova](http://cordova.apache.org/))
- [BTC Angular](https://github.com/jupl/btc-angular) ([AngularJS](http://angularjs.org/))
- [BTC Chaplin](https://github.com/jupl/btc-chaplin) ([Chaplin](http://chaplinjs.org/))
- [BTC Ember](https://github.com/jupl/btc-ember) ([Ember.js](http://emberjs.com/))

Visit [the site](http://jupl.github.io/btc/) for more information.


## File Structure
    ├── app                     # Assets/code/styles for the client application
    │   └── assets              # Static files copied without modification
    ├── generators              # Generators used by Scaffolt
    ├── jakelib                 # Unified set of tasks for development
    ├── public                  # Compiled client-side assets
    ├── server                  # Server configuration
    │   ├── browser-sync.js     # BrowserSync proxy setup
    │   └── index.js            # Starting point of server setup
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


## Setup
1. Download and install the following if you have not already:
  - [Node.js](http://nodejs.org/download/)
  - [Git](http://git-scm.com/downloads)
  - [Jake](https://github.com/mde/jake#installing-with-npm) (if developing)
  - [Platform SDKs](https://github.com/apache/cordova-cli#requirements) (if using Cordova)
  - [MongoDB](http://www.mongodb.org/) or service (if using Serverpack)
2. Download one of the starter projects from GitHub.
3. Navigate to the project directory and run the command `npm install`.


## Notes

### `npm start` / `npm test`
One-line commands are provided for convenience as well for those that want to start running things as quickly as possible by installing depedencies automatically. Use `npm start` to download non-development packages and run the `build:prod` task. Use `npm test` to download all packages and run both the `test:install` and `test:all` tasks.

### Server
A basic push state server serving static assets is included by default. You can expand/enhance the server as needed for services and to create a more ambitious application.


## Libraries

### Core
- [Jake](https://github.com/mde/jake)
- [Brunch](http://brunch.io/)
- [Bower](http://bower.io/)
- [Scaffolt](https://github.com/paulmillr/scaffolt)

### Utilities
- [jQuery](http://jquery.com)
- [normalize.css](http://necolas.github.io/normalize.css/)
- [BrowserSync](http://browsersync.io/)

### Testing
- [Karma](http://karma-runner.github.io/)
- [Selenium WebDriver](https://code.google.com/p/selenium/wiki/WebDriverJs)
- [PhantomJS](http://phantomjs.org/)
- [Mocha](http://visionmedia.github.com/mocha/)
- [Mocha as Promised](https://github.com/domenic/mocha-as-promised)
- [Chai](http://chaijs.com/)
- [Sinon](http://sinonjs.org/)
- [Sinon-Chai](https://github.com/domenic/sinon-chai)
- [nodemon](http://remy.github.io/nodemon/)
