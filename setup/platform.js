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
  }
};

/**
 * List of platforms supported.
 * @type {Array}
 */
module.exports.platforms = ['web'];

/**
 * Modify configuration to match the web platform. This entails setting the
 * public directory path.
 * @param  {Object} config
 */
function webPlatform(config) {
  if(!config.paths) {
    config.paths = {};
  }
  config.paths.public = 'public';
}
