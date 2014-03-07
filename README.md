# [BTC Serverpack](http://jupl.github.io/btc/) 0.1.1
[![Dependency Status](https://gemnasium.com/jupl/btc-serverpack.png)](https://gemnasium.com/jupl/btc-serverpack)

This is the base skeleton with server extras for the following derived project templates:
- [BTC Angular](https://github.com/jupl/btc-angular/tree/server) ([AngularJS](http://angularjs.org/))
- [BTC Chaplin](https://github.com/jupl/btc-chaplin/tree/server) ([Chaplin](http://chaplinjs.org/))
- [BTC Ember](https://github.com/jupl/btc-ember/tree/server) ([Ember.js](http://emberjs.com/))

Visit [the site](http://jupl.github.io/btc/) for more information.

## File Structure
    ├── app                     # Assets/code/styles for the client application
    │   └── assets              # Static files copied without modification
    ├── generators              # Generators used by Scaffolt
    ├── jakelib                 # Unified set of tasks for development
    ├── public                  # Compiled client-side assets
    ├── server                  # Server configuration
    │   ├── models              # Persistent server-side model configuration
    │   ├── passport            # Passport integration
    │   ├── routes              # Custom routes/proxies/etc. (server-side)
    │   ├── browser-sync.js     # BrowserSync proxy setup
    │   ├── config.js           # Configuration options
    │   ├── index.js            # Starting point of server setup
    │   ├── prerender.js        # Prerender middleware integration
    │   └── session.js          # Session configuration
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
  - [MongoDB](http://www.mongodb.org/) or service
2. Download one of the starter projects from GitHub.
3. Navigate to the project directory and run the command `npm install`.


## Notes

### `npm start` / `npm test`
One-line commands are provided for convenience as well for those that want to start running things as quickly as possible by installing depedencies automatically. Use `npm start` to download non-development packages and run the `server:prod` task. Use `npm test` to download all packages and run both the `test:install` and `test:all` tasks.

### Server
Out of the box the server provides:
- Serve static assets with support for HTML5 push state
- Models and sessions with [Mongoose](http://mongoosejs.com/)
- Authentication with [Passport](http://passportjs.org/)
- Caching with [Prerender](https://prerender.io/).


## Libraries

### Core
- [BTC](https://github.com/jupl/btc) 0.10.3
- [Mongoose](http://mongoosejs.com/)
- [Passport](http://passportjs.org/)

### Utilities
- [Prerender](https://prerender.io/)
