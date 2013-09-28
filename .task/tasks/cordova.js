'use strict';

require('sugar');
var Q = require('q');
var fs = require('fs');
var path = require('path');
var prompt = require('../lib').prompt;
var wrench = require('wrench');
var exec = require('../lib/execute');
var cordova = module.exports = Object.create(exec);

// Declare paths to resolve
var appPath = path.resolve(__dirname, '../../app');
var projectPath = path.resolve(__dirname, '../../build/cordova');
var gitignorePath = path.resolve(__dirname, '../gitignore');
cordova.command = path.resolve(__dirname, '../../node_modules/.bin/cordova');

cordova.devices = ['android', 'ios'];

cordova.add = function(device) {
  return this.execute(['--verbose', 'platform', 'add', device], {cwd: projectPath}).then(function() {
    var deferred = Q.defer();
    var stream = fs.createReadStream(path.resolve(gitignorePath, device + '.gitignore'));
    stream.on('end', function() { deferred.resolve() });
    stream.on('error', function() { deferred.error() });
    stream.pipe(fs.createWriteStream(path.resolve(projectPath, 'platforms', device, '.gitignore')));
    return deferred.promise;
  });
};

cordova.remove = function(device) {
  return this.execute(['--verbose', 'platform', 'remove', device], {cwd: projectPath});
};

cordova.build = function(device) {
  return this.execute(['--verbose', 'build', device], {cwd: projectPath});
};

cordova.emulate = function(device) {
  var self = this;
  return this.build(device).then(function() {
    return self.execute(['--verbose', 'emulate', device], {cwd: projectPath});
  });
};

// Generate alias for each cordova action and device
['add', 'remove', 'build', 'emulate'].forEach(function(action) {
  cordova.devices.forEach(function(device) {
    cordova[action][device] = function() {
      return cordova[action](device);
    };
  })
});

cordova.initialize = function() {
  var self = this;
  var args = ['--verbose', 'create', projectPath];

  prompt('Package name (optional): ', {
    default: '',
    validator: function(name) {
      var name = name.parameterize().dasherize().replace(/-/g, '.');

      if(!name) {
        return;
      }
      if(name.has('.')) {
        return name;
      }
      else {
        throw new Error('Invalid package name');
      }
    }
  })
  .then(function(packageName) {
    if(packageName) {
      args.push(packageName);
      return prompt('App name (optional): ', {
        default: '',
        validator: function(name) {
          return name.parameterize().camelize();
        }
      });
    }
  })
  .then(function(appName) {
    if(appName) {
      args.push(appName);
    }
    wrench.rmdirSyncRecursive(projectPath, function() {});
    return self.execute(args);
  })
  .then(function() {
    var deferred = Q.defer();
    var stream = fs.createReadStream(path.resolve(projectPath, 'www/config.xml'));
    stream.on('end', function() { deferred.resolve() });
    stream.on('error', function() { deferred.error() });
    stream.pipe(fs.createWriteStream(path.resolve(appPath, 'assets/config.xml')));
    return deferred.promise;
  })
  .then(function() {
    wrench.copyDirSyncRecursive(path.resolve(projectPath, 'www/res'), path.resolve(appPath, 'assets/res'), function() {});
  });
};