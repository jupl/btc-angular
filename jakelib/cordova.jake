// Cordova-based build tasks
require('sugar');
var devices = require('./lib').devices;
var path = require('path');
var Promise = require('bluebird');

var assetsPath = path.resolve(process.cwd(), 'app/assets');
var projectPath = path.resolve(process.cwd(), 'cordova');

namespace('emulate', function() {
  desc('Build project for development and simulate/emulate on a device');
  task('dev', function() {
    var device = process.env.device;

    validateDevice(device);
    process.env.platform = 'cordova';
    return jake.Task['build:dev'].invoke().then(function() {
      return new Promise(function(resolve) {
        jake.exec('./node_modules/.bin/cordova -d emulate ' + device, {interactive: true}, resolve);
      });
    });
  });

  desc('Build project for production and simulate/emulate on a device');
  task('prod', function() {
    var device = process.env.device;

    validateDevice(device);
    process.env.platform = 'cordova';
    return jake.Task['build:prod'].invoke().then(function() {
      return new Promise(function(resolve) {
        jake.exec('./node_modules/.bin/cordova -d emulate ' + device, {interactive: true}, resolve);
      });
    });
  });
});

namespace('cordova', function() {
  desc('Initialize Cordova builds by creating a Cordova project');
  task('init', function() {
    var command = './node_modules/.bin/cordova -d create ' + projectPath;

    validateProject(process.env.package, process.env.name);
    if(process.env.package) {
      command += ' ' + process.env.package.dasherize().replace(/-/g, '.');
      if(process.env.name) {
        command = ' ' + process.env.name.camelize();
      }
    }

    return new Promise(function(resolve) {
      jake.rmRf(projectPath, {silent: true});
      jake.exec(command, {interactive: true}, resolve);
    })
    .then(function() {
      jake.cpR(path.resolve(projectPath, 'www/config.xml'), assetsPath);
      jake.cpR(path.resolve(projectPath, 'www/res'), assetsPath);
    });
  });

  desc('Add a device to the Cordova project');
  task('add', function() {
    var device = process.env.device;

    validateDevice(device);
    return new Promise(function(resolve) {
      jake.exec('./node_modules/.bin/cordova -d platform add ' + device, {interactive: true}, resolve);
    })
    .then(function() {
      jake.cpR(path.resolve(__dirname, 'assets', device + '.gitignore'), path.resolve(projectPath, 'platforms', device, '.gitignore'));
    });
  });

  desc('Remove a device from the Cordova project');
  task('rem', function() {
    var device = process.env.device;

    validateDevice(device);
    return new Promise(function(resolve) {
      jake.exec('./node_modules/.bin/cordova -d platform remove ' + device, {interactive: true}, resolve);
    });
  });
});

function validateDevice(device) {
  if(!device) {
    fail('Device name required');
  }
  else if(devices.indexOf(device) !== -1) {
    fail('Device is not available');
  }
}

function validateProject(packageName, appName) {
  if(packageName && !packageName.dasherize().has('-')) {
    fail('Invalid package name');
  }
  else if(appName && !packageName) {
    fail('Package name required');
  }
}
