'use strict';

var wrench = require('wrench');
var bower = require('./bower');
var exec = require('../lib/execute');
var platforms = require('../../.setup/platform').platforms;
var cordova = require('./cordova');
var environments = require('../../.setup/environment').environments;
var build = module.exports = Object.create(exec);

build.command = './node_modules/.bin/brunch';

['once', 'watch', 'server'].forEach(function(type) {
  if(!build[type]) {
    build[type] = {};
  }

  platforms.forEach(function(platform) {
    if(platform === 'cordova') {
      return;
    }
    if(!build[type][platform]) {
      build[type][platform] = {};
    }
    environments.forEach(function(environment) {
      build[type][platform][environment] = function() {
        return build.run(type, platform, environment);
      };
    });
  });
});

['once', 'emulate'].forEach(function(type) {
  if(!build[type]) {
    build[type] = {};
  }

  cordova.devices.forEach(function(device) {
    if(!build[type][device]) {
      build[type][device] = {};
    }
    environments.forEach(function(environment) {
      build[type][device][environment] = function() {
        return build.cordova(type, device, environment);
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

  return bower.install().then(function() {
    self.execute(args);
  });
};

build.cordova = function(type, device, environment) {
  var env = 'cordova:' + environment;
  var self = this;
  var args = ['build', '-e', env];

  // Before running the brunch command let's clear the public folder
  var config = require('../../brunch-config').config.overrides[env];
  wrench.rmdirSyncRecursive(config.paths.public, function() {});

  return bower.install().then(function() {
    return self.execute(args);
  })
  .then(function() {
    switch(type) {
      case 'once':
        return cordova.build(device);
      case 'emulate':
        return cordova.emulate(device);
    }
  });
};