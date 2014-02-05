var addIgnored = require('./util').addIgnored;

/**
 * Modify given Brunch configuration to fit a given environment. Currently
 * there is support for a development and production environment.
 * @param  {String} platform
 * @param  {Object} config
 */
module.exports = function(environment, config) {
  switch(environment) {
    case 'dev':
      devEnvironment(config);
      break;
    case 'prod':
      prodEnvironment(config);
      break;
  }
};

/**
 * List of environments supported.
 * @type {Array}
 */
module.exports.environments = ['dev', 'prod'];

/**
 * Modify configuration to match the development environment. This entails
 * adding test files to the build.
 * @param  {Object} config
 */
function devEnvironment(config) {
  var jsJoinTo = config.files.javascripts.joinTo;
  var cssJoinTo = config.files.stylesheets.joinTo;

  // Check if Mocha is installed. If not, ignore test
  if(!require('../bower.json').dependencies.mocha) {
    addIgnored(config, /^test/);
    return;
  }

  // Add test javascript files
  jsJoinTo['test/javascripts/tests.js'] = /^test[\\\/]code/;
  jsJoinTo['test/javascripts/vendor.js'] = /^bower_components[\\\/](chai|mocha|sinon)/;

  // Add test css files
  cssJoinTo['test/stylesheets/test.css'] = /^bower_components[\\\/]mocha/;
}

/**
 * Modify configuration to match the production environment. This entails
 * ignoring test files, disabling source maps, disabling auto-reload, and
 * minifying/uglifying code.
 * @param  {Object} config
 */
function prodEnvironment(config) {
  addIgnored(config, /^test/);
  config.optimize = true;
  config.sourceMaps = false;
  if(!config.plugins) {
    config.plugins = {};
  }
  config.plugins.autoReload = false;
}
