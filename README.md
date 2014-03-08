# [BTC Cordova](http://jupl.github.io/btc/cordova/) 0.10.2
[![Dependency Status](https://gemnasium.com/jupl/btc-cordova.png)](https://gemnasium.com/jupl/btc-cordova)

This is the base skeleton with Cordova for the following derived project templates:
- [BTC Angular](https://github.com/jupl/btc-angular/tree/cordova) ([AngularJS](http://angularjs.org/))
- [BTC Chaplin](https://github.com/jupl/btc-chaplin/tree/cordova) ([Chaplin](http://chaplinjs.org/))
- [BTC Ember](https://github.com/jupl/btc-ember/tree/cordova) ([Ember.js](http://emberjs.com/))

Visit [the site](http://jupl.github.io/btc/cordova/) for more information.


## File Structure
    ├── app                     # Assets/code/styles for the client application
    │   └── assets              # Static files copied without modification
    ├── cordova                 # Cordova project
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
  - [Platform SDKs](https://github.com/apache/cordova-cli#requirements)
2. Download one of the starter projects from GitHub.
3. Navigate to the project directory and run the command `npm install`.


## Notes

### `npm test`
One-line commands are provided for convenience as well for those that want to start running things as quickly as possible by installing depedencies automatically. Use `npm test` to download all packages and run both the `test:install` and `test:all` tasks.


## Libraries

### Core
- [BTC](https://github.com/jupl/btc) 0.10.3
- [Cordova](http://cordova.apache.org) 3.4

### Utilities
- [FastClick](https://github.com/ftlabs/fastclick)
- [Hammer.js](http://eightmedia.github.io/hammer.js/)
- [device.js](http://matthewhudson.me/projects/device.js/)
