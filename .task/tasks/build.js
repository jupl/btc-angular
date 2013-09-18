'use strict';

var wrench = require('wrench');
var bower = require('./bower');
var exec = require('../lib/execute');
var platforms = require('../../.setup/platform').platforms;
var environments = require('../../.setup/environment').environments;
var build = module.exports = Object.create(exec);

build.command = './node_modules/.bin/brunch';

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
  var args = [];
  var self = this;
  var env = platform + ':' + environment;

  switch(args) {
    case 'once':
      args.push('build');
      break;
    case 'watch':
      args.push('watch');
      break;
    case 'server':
      args.push('watch', '-s');
      break;
  }

  args.push('--env', env);

  // Before running the brunch command let's clear the public folder
  var config = require('../../config').config.overrides[env];
  wrench.rmdirSyncRecursive(config.paths.public, function() {});

  return bower.install.then(function() {
    self.exec(args);
  });
};