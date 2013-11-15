// Cordova-based build tasks
require('sugar');
var devices = require('./lib').devices;
var execute = require('./lib').execute;
var localBinCommand = require('./lib').localBinCommand;
var path = require('path');
var Promise = require('bluebird');
var resolvePath = require('./lib').resolvePath;

var assetsPath = resolvePath('app', 'assets');
var projectPath = resolvePath('cordova');

namespace('emulate', function() {
  desc('Build project for development and simulate/emulate on a device');
  task('dev', function() {
    var device = process.env.device;

    validateDevice(device);
    process.env.device = 'none'; // Don't run Cordova in build:dev
    return new Promise(function(resolve) {
      jake.Task['build:dev'].addListener('complete', resolve).invoke();
    })
    .then(function() {
      var command = localBinCommand('cordova', '-d emulate ' + device);
      return execute(command, {cwd: projectPath});
    });
  });

  desc('Build project for production and simulate/emulate on a device');
  task('prod', function() {
    var device = process.env.device;

    validateDevice(device);
    process.env.device = 'none'; // Don't run Cordova in build:prod
    return new Promise(function(resolve) {
      jake.Task['build:prod'].addListener('complete', resolve).invoke();
    })
    .then(function() {
      var command = localBinCommand('cordova', '-d emulate ' + device);
      return execute(command, {cwd: projectPath});
    });
  });
});

namespace('cordova', function() {
  desc('Initialize Cordova builds by creating a Cordova project');
  task('init', function() {
    var name = process.env.name;
    var package = process.env.package;

    validateProject(package, name);
    if(package) {
      if(name) {
        name = name.camelize();
      }
      else {
        name = '';
      }
    }
    else {
      package = '';
      name = '';
    }

    var params = '-d create ' + projectPath + ' ' + package + ' ' + name;
    var command = localBinCommand('cordova', params);
    jake.rmRf(projectPath, {silent: true});
    return execute(command).then(function() {
      jake.cpR(path.resolve(projectPath, 'www', 'config.xml'), assetsPath);
      jake.cpR(path.resolve(projectPath, 'www', 'res'), assetsPath);
    });
  });

  desc('Add a device to the Cordova project');
  task('add', function() {
    var command;
    var device = process.env.device;

    validateDevice(device);
    command = localBinCommand('cordova', '-d platform add ' + device);
    return execute(command, {cwd: projectPath}).then(function() {
      var origin = resolvePath('jakelib/assets', device + '.gitignore');
      var dest = path.resolve(projectPath, 'platforms', device, '.gitignore');
      jake.cpR(origin, dest);
    });
  });

  desc('Remove a device from the Cordova project');
  task('rem', function() {
    var command;
    var device = process.env.device;

    validateDevice(device);
    command = localBinCommand('cordova', '-d platform remove ' + device);
    return execute(command, {cwd: projectPath});
  });
});

function validateDevice(device) {
  if(!device) {
    fail('Device name required');
  }
  else if(devices.indexOf(device) === -1) {
    fail('Device is not available');
  }
}

function validateProject(packageName, appName) {
  if(packageName && !/(\w+\.)+\w+/.test(packageName)) {
    fail('Invalid package name');
  }
  else if(appName && !packageName) {
    fail('Package name required');
  }
}
