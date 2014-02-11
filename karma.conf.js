'use strict';

var paths = require('./brunch-config').config.paths;

module.exports = function(config) {
  config.set({
    autoWatch: true,
    frameworks: ['mocha', 'chai', 'sinon-chai', 'detectBrowsers'],
    files: [
      'node_modules/mocha-as-promised/mocha-as-promised.js',
      paths.public + '/javascripts/vendor.js',
      paths.public + '/javascripts/app.js',
      'test/code/**/*'
    ]
  });
};
