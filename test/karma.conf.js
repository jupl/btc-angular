var brunchConfig = require('../brunch-config').config.overrides['web:dev'];
var path = require('path');
var publicPath = path.resolve(__dirname, '..', brunchConfig.paths.public);

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'sinon-chai'],
    files: [
      path.resolve(__dirname, 'node_modules/mocha-as-promised/mocha-as-promised.js'),
      path.resolve(publicPath, '**/*.js'),
      path.resolve(__dirname, 'code/*.js'),
      path.resolve(__dirname, 'code/**/*.js')
    ],
    exclude: [
      path.resolve(publicPath, 'test/**/*.js')
    ]
  });
};
