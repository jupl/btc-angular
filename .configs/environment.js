'use strict';

var addIgnored = require('./utilities').addIgnored;

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

module.exports.environments = ['dev', 'prod'];

// Modify given config so that test files are included
function devEnvironment(config) {
  // Get reference to CSS and JS joinTos
  var jsJoinTo = config.files.javascripts.joinTo;
  var cssJoinTo = config.files.stylesheets.joinTo;

  // Add test javascript files
  jsJoinTo['test/javascripts/tests.js'] = /^test[\\\/]tests/;
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

// Modify given config so that certain files are ignored
function prodEnvironment(config) {
  addIgnored(config, /^test/);
  config.optimize = true;
  config.sourceMaps = false;
}