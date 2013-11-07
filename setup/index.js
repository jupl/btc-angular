require('sugar');
var setDefaults = require('./defaults');
var setEnvironment = require('./environment');
var setPlatform = require('./platform');

/**
 * Take a given Brunch configuration and append additional configuration
 * options for different environments and platforms. For more information on
 * that see environment.js and platform.js.
 * @param  {Object} originalConfig
 * @return {Object}
 */
module.exports = function(originalConfig) {
  var finalConfig = {
    overrides: {}
  };

  // Generate full config clones for each combination of platform/environment.
  setPlatform.platforms.forEach(function(platform) {
    setEnvironment.environments.forEach(function(environment) {
      var config = Object.clone(originalConfig, true);
      setDefaults(config);
      setPlatform(platform, config);
      setEnvironment(environment, config);
      finalConfig.overrides[platform + ':' + environment] = config;
    });
  });

  return finalConfig;
}
