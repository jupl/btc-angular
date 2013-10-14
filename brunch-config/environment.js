var addIgnored = require('./lib').addIgnored;

// Adjust Brunch configuration object to fit a specific environment
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

// List of environments supported
module.exports.environments = ['dev', 'prod'];

// For a development environment include test files
function devEnvironment(config) {
  var jsJoinTo = config.files.javascripts.joinTo;
  var cssJoinTo = config.files.stylesheets.joinTo;

  // Add test javascript files
  jsJoinTo['test/javascripts/tests.js'] = /^test[\\\/]white/;
  jsJoinTo['test/javascripts/vendor.js'] = /^test[\\\/]vendor/;
  if(!config.files.javascripts.order) {
    config.files.javascripts.order = {};
  }
  if(!config.files.javascripts.order.after) {
    config.files.javascripts.order.after = [];
  }
  config.files.javascripts.order.after.push('test/vendor/scripts/test-helper.js');

  // Add test css files
  cssJoinTo['test/stylesheets/test.css'] = /^test/;
}

// For a production environment:
//  ignore test files
//  ignore source maps
//  optimize generated code
//  disable auto-reload
function prodEnvironment(config) {
  addIgnored(config, /^test/);
  config.optimize = true;
  config.sourceMaps = false;
  if(!config.plugins) {
    config.plugins = {};
  }
  config.plugins.autoReload = false;
}