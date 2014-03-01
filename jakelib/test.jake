'use strict';

// Test-related tasks
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var brunch = require('./lib').npmBin('brunch');
var config = require('../brunch-config').config;
var karma = require('./lib').npmBin('karma');
var mocha = require('./lib').npmBin('mocha');
var npm = require('./lib').bin('npm');
var nodemon = require('./lib').npmBin('nodemon');
var phantomjs = require('./lib').npmBin('phantomjs');

// Hide output from PhantomJS
delete phantomjs.options.stdio;

namespace('test', function() {
  desc('Install required testing components');
  task('install', function() {
    return npm.execute('install',
      'karma-chai-plugins@~0.2.0',
      'karma-detect-browsers@~0.1.2',
      'karma-mocha@~0.1.1',
      'chai@~1.9.0',
      'mocha@~1.17.1',
      'mocha-as-promised@~2.0.0',
      'phantomjs@~1.9.2',
      'selenium-webdriver@~2.39.0');
  });

  desc('Run all tests');
  task('all', function() {
    process.env.watch = null;
    return new Promise(function(resolve) {
      console.log('\nCode testing\n------------');
      if(process.env.codereporter) {
        process.env.reporter = process.env.codereporter;
      }
      jake.Task['test:code'].addListener('complete', function() {
        console.log('\nSite testing\n------------')
        if(process.env.sitereporter) {
          process.env.reporter = process.env.sitereporter;
        }
        else {
          delete process.env.reporter;
        }
        jake.Task['test:site'].addListener('complete', resolve).execute();
      }).execute();
    });
  });

  desc('Run code-based tests using Karma');
  task('code', ['bower:install', 'clean:web'], function() {
    var args = ['start'];

    // Check for reporter
    if(process.env.reporter) {
      args.push('--reporters');
      args.push(process.env.reporter);
    }

    // Default behavior is to run tests once
    if(process.env.watch !== 'true' && process.env.watch !== 'server') {
      return new Promise(function(resolve) {
        jake.Task['build:dev'].addListener('complete', function() {
          args.push('--single-run');
          resolve(karma.execute(args));
        }).execute();
      });
    }
    // Also tests can be run continuously
    else {
      if(process.env.watch === 'server') {
        var server = brunch.execute('watch', '--server');
      }
      else {
        var server = brunch.execute('watch');
      }
      return new Promise(function(resolve, reject) {
        server.catch(reject);
        var id = setInterval(function() {
          // Check if code is available
          if(fs.existsSync(path.join(config.paths.public, 'scripts'))) {
            clearInterval(id);
            args.push('--no-single-run');
            karma.execute(args).then(resolve, reject);
          }
        }, 500);
      })
      .finally(function() {
        if(!server.isFulfilled()) {
          server.cancel();
        }
      });
    }
  });

  desc('Run site-based tests using Mocha and WebDriverJS');
  task('site', ['bower:install', 'clean:web'], function() {
    var phantom = phantomjs.execute('--webdriver=4444');
    var server = brunch.execute('watch', '--server', '--production');
    var args = [];

    // Check for reporter
    if(process.env.reporter) {
      args.push('--reporter');
      args.push(process.env.reporter);
    }

    return new Promise(function(resolve, reject) {
      phantom.catch(reject);
      server.catch(reject);
      var id = setInterval(function() {
        // Check if code is available
        if(fs.existsSync(path.join(config.paths.public, 'scripts'))) {
          clearInterval(id);
          if(process.env.watch === 'true') {
            args.unshift(path.join('node_modules', '.bin', 'mocha'));
            args.unshift(path.join('test', 'site'));
            args.unshift('--watch');
            args.unshift(config.paths.public);
            args.unshift('--watch');
            nodemon.execute(args).then(resolve, reject);
          }
          else {
            mocha.execute(args).then(resolve, reject);
          }
        }
      }, 500);
    })
    // Make sure to stop server and phantom on success or fail
    .finally(function() {
      if(!phantom.isFulfilled()) {
        phantom.cancel();
      }
      if(!server.isFulfilled()) {
        server.cancel();
      }
    });
  });
});
