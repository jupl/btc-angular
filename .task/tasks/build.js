'use strict';

var wrench = require('wrench');
var bower = require('./bower');
var exec = require('../lib/execute');
var platforms = require('../../.setup/platform').platforms;
var environments = require('../../.setup/environment').environments;
var build = module.exports = Object.create(exec);

build.command = './node_modules/.bin/brunch';

// Generate alias for each build command combination
['once', 'watch', 'server'].forEach(function(type) {
  if(!build[type]) {
    build[type] = {};
  }
  platforms.forEach(function(platform) {
    if(!build[type][platform]) {
      build[type][platform] = {};
    }
    environments.forEach(function(environment) {
      build[type][platform][environment] = function() {
        build.run(type, platform, environment);
      };
    });
  });
});

build.run = function(type, platform, environment) {
  var env = platform + ':' + environment;
  var self = this;
  var args = ['-e', env];

  // Determine which Brunch command to run
  switch(type) {
    case 'once':
      args.unshift('build');
      break;
    case 'watch':
      args.unshift('watch');
      break;
    case 'server':
      args.unshift('watch', '-s');
      break;
  }

  // Before running the brunch command let's clear the public folder
  var config = require('../../brunch-config').config.overrides[env];
  wrench.rmdirSyncRecursive(config.paths.public, function() {});

  return bower.install().done(function() {
    self.execute(args);
  });
};