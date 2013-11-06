// Brunch build tasks
var devices = require('./lib').devices;
var Promise = require('bluebird');

namespace('build', function() {
  desc('Build project (web or device) for development');
  task('dev', ['bower:install'], function() {
    var device = process.env.device;

    validateDevice(device);
    if(device) {
      jake.Task['clean:cordova'].invoke();
      return new Promise(function(resolve) {
        jake.exec('./node_modules/.bin/brunch b -e cordova:dev', {interactive: true}, resolve);
      }).then(function() {
        return new Promise(function(resolve) {
          jake.exec('./node_modules/.bin/cordova -d build ' + device, {interactive: true}, resolve);
        });
      });
    }
    else {
      jake.Task['clean:web'].invoke();
      return new Promise(function(resolve) {
        jake.exec('./node_modules/.bin/brunch b -e web:dev', {interactive: true}, resolve);
      });
    }
  });

  desc('Build project (web or device) for production');
  task('prod', ['bower:install'], function() {
    var device = process.env.device;

    validateDevice(device);
    if(device) {
      jake.Task['clean:cordova'].invoke();
      return new Promise(function(resolve) {
        jake.exec('./node_modules/.bin/brunch b -e cordova:dev', {interactive: true}, resolve);
      }).then(function() {
        return new Promise(function(resolve) {
          jake.exec('./node_modules/.bin/cordova -d build ' + device, {interactive: true}, resolve);
        });
      });
    }
    else {
      jake.Task['clean:web'].invoke();
      return new Promise(function(resolve) {
        jake.exec('./node_modules/.bin/brunch b -e web:prod', {interactive: true}, resolve);
      });
    }
  });
});

namespace('watch', function() {
  desc('Build project for development and rebuild on changes');
  task('dev', ['bower:install', 'clean:web'], function() {
    return new Promise(function(resolve) {
      jake.exec('./node_modules/.bin/brunch w -e web:dev', {interactive: true}, resolve);
    });
  });

  desc('Build project for production and rebuild on changes');
  task('prod', ['bower:install', 'clean:web'], function() {
    return new Promise(function(resolve) {
      jake.exec('./node_modules/.bin/brunch w -e web:prod', {interactive: true}, resolve);
    });
  });
});

namespace('server', function() {
  desc('Build project for development, rebuild on changes, and host locally');
  task('dev', ['bower:install', 'clean:web'], function() {
    return new Promise(function(resolve) {
      jake.exec('./node_modules/.bin/brunch w -s -e web:dev', {interactive: true}, resolve);
    });
  });

  desc('Build project for production, rebuild on changes, and host locally');
  task('prod', ['bower:install', 'clean:web'], function() {
    return new Promise(function(resolve) {
      jake.exec('./node_modules/.bin/brunch w -s -e web:prod', {interactive: true}, resolve);
    });
  });
});

function validateDevice(device) {
  if(device && devices.indexOf(device) === -1) {
    fail('Device is not available');
  }
}
