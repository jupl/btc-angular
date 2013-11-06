var addIgnored = require('./util').addIgnored;

/**
 * Modify given Brunch configuration to fit a given platform.  Currently
 * there is support for a web platform.
 * @param  {String} platform
 * @param  {Object} config
 */
module.exports = function(platform, config) {
  switch(platform) {
    case 'web':
      webPlatform(config);
      break;
    case 'cordova':
      cordovaPlatform(config);
      break;
  }
};

/**
 * List of platforms supported.
 * @type {Array}
 */
module.exports.platforms = ['web', 'cordova'];

/**
 * Modify configuration to match the web platform. This entails setting the
 * public directory path and ignoring Cordova-specific files.
 * @param  {Object} config
 */
function webPlatform(config) {
  if(!config.paths) {
    config.paths = {};
  }
  addIgnored(config, /^app[\\\/]assets[\\\/]res/, 'app/assets/config.xml');
  config.paths.public = 'public';
}

/**
 * Modify configuration to match the Cordova platform. This entails setting the
 * public directory path.
 * @param  {Object} config
 */
function cordovaPlatform(config) {
  if(!config.paths) {
    config.paths = {};
  }
  config.paths.public = 'cordova/www'
}
