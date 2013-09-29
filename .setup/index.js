'use strict';

var clone = require('./lib').clone;
var setPlatform = require('./platform');
var setEnvironment = require('./environment');

// Set up config by taking the given base configuration and split
// it into multiple pieces based on overrides.
module.exports = function(config) {
  var newConfig = {
    overrides: {}
  };

  setPlatform.platforms.forEach(function(platform) {
    setEnvironment.environments.forEach(function(environment) {
      var conf = clone(config);
      setPlatform(platform, conf);
      setEnvironment(environment, conf);
      newConfig.overrides[platform + ':' + environment] = conf;
    });
  });

  return newConfig;
}