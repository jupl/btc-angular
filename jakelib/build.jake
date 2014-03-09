'use strict';

// Brunch build tasks
var path = require('path');
var brunch = require('./lib').npmBin('brunch');
var cordova = require('./lib').bin(path.resolve('node_modules/.bin/cordova'));
var devices = require('./lib').devices;

namespace('build', function() {
  desc('Build project (web or device) for development');
  task('dev', ['bower:install'], function() {
    var device = process.env.device;

    validateDevice(device);
    if(device) {
      jake.Task['clean:cordova'].invoke();
      return brunch.execute('build', '--env', 'cordova').then(function() {
        if(device !== 'none') {
          cordova.options.cwd = 'cordova';
          return cordova.execute('--verbose', 'build', device);
        }
      });
    }
    else {
      jake.Task['clean:web'].invoke();
      return brunch.execute('build');
    }
  });

  desc('Build project (web or device) for production');
  task('prod', ['bower:install'], function() {
    var device = process.env.device;

    validateDevice(device);
    if(device) {
      jake.Task['clean:cordova'].invoke();
      return brunch.execute('build', '--env', 'cordova', '--production')
      .then(function() {
        if(device !== 'none') {
          cordova.options.cwd = 'cordova';
          return cordova.execute('--verbose', 'build', device);
        }
      });
    }
    else {
      jake.Task['clean:web'].invoke();
      return brunch.execute('build', '--production');
    }
  });
});

namespace('watch', function() {
  desc('Build project for development and rebuild on changes');
  task('dev', ['bower:install', 'clean:web'], function() {
    return brunch.execute('watch');
  });

  desc('Build project for production and rebuild on changes');
  task('prod', ['bower:install', 'clean:web'], function() {
    return brunch.execute('watch', '--production');
  });
});

namespace('server', function() {
  desc('Build project for development, rebuild on changes, and host locally');
  task('dev', ['bower:install', 'clean:web'], function() {
    return brunch.execute('watch', '--server');
  });

  desc('Build project for production, rebuild on changes, and host locally');
  task('prod', ['bower:install', 'clean:web'], function() {
    delete process.env.browsersync;
    return brunch.execute('watch', '--server', '--production');
  });
});

function validateDevice(device) {
  if(device && devices.indexOf(device) === -1 && device !== 'none') {
    fail('Device is not available');
  }
}
