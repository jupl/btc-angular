'use strict';

var config = require('./brunch-config').config;
var path = require('path');

module.exports = function(karmaConfig) {
  karmaConfig.set({
    autoWatch: true,
    frameworks: ['mocha', 'chai', 'sinon-chai', 'detectBrowsers'],
    files: [
      'node_modules/mocha-as-promised/mocha-as-promised.js',
      path.join(config.paths.public, 'scripts/vendor.js'),
      'bower_components/angular-mocks/angular-mocks.js',
      path.join(config.paths.public, 'scripts/app.js'),
      'test/code/**/*'
    ]
  });
};
