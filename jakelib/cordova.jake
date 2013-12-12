// Cordova-based build tasks
require('sugar');
var brunch = require('./lib').npmBin('brunch');
var cordova = require('./lib').npmBin('cordova');
var devices = require('./lib').devices;
var path = require('path');
var Promise = require('bluebird');

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
      cordova.options.cwd = 'cordova';
      return cordova.execute('--verbose', 'emulate', device);
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
      cordova.options.cwd = 'cordova';
      return cordova.execute('--verbose', 'emulate', device);
    });
  });
});

namespace('cordova', function() {
  desc('Initialize Cordova builds by generating a Cordova project');
  task('gen', function() {
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

    var args = ['--verbose', 'create', 'cordova', package, name];
    jake.rmRf('cordova', {silent: true});
    return cordova.execute(args).then(function() {
      var assetsPath = path.resolve('app', 'assets');
      var configPath = path.resolve('cordova', 'www', 'config.xml');
      jake.cpR(configPath, assetsPath);
    });
  });

  desc('Add a device to the Cordova project');
  task('add', function() {
    var command;
    var device = process.env.device;
    var args = ['--verbose', 'platform', 'add', device];

    validateDevice(device);
    cordova.options.cwd = 'cordova';
    return cordova.execute(args).then(function() {
      var origin = resolvePath('jakelib', 'assets', device + '.gitignore');
      var dest = path.resolve(projectPath, 'platforms', device, '.gitignore');
      jake.cpR(origin, dest);
    });
  });

  desc('Remove a device from the Cordova project');
  task('rem', function() {
    var command;
    var device = process.env.device;
    var args = ['--verbose', 'platform', 'remove', device];

    validateDevice(device);
    cordova.options.cwd = 'cordova';
    return cordova.execute(args);
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
