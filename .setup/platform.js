'use strict';

var addIgnored = require('./lib').addIgnored;

// Adjust Brunch configuration object to fit a specific platform
module.exports = function(platform, config) {
  switch(platform) {
    case 'web':
      webPlatform(config);
      break;
    case 'cordova':
      cordovaPlatform(config);
  }
};

// List of platforms supported
module.exports.platforms = ['web', 'cordova'];

// For a generic web app, ignore any Cordova-specific files
function webPlatform(config) {
  if(!config.paths) {
    config.paths = {};
  }
  addIgnored(config, /^app[\\\/]assets[\\\/]res/, 'app/assets/config.xml');
  config.paths.public = 'build/web';
}

// For Cordova, simply specify cordova directory
function cordovaEnvironment(config) {
  if(!config.paths) {
    config.paths = {};
  }
  config.paths.public = 'build/cordova/www'
}