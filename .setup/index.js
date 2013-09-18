'use strict';

var clone = require('./utilities').clone;
var setPlatform = require('./platform');
var setEnvironment = require('./environment');

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