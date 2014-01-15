// Test-related tasks
var brunch = require('./lib').npmBin('brunch');
var config = require('../brunch-config').config.overrides['web:dev'];
var karma = require('./lib').npmBin('karma');
var mocha = require('./lib').npmBin('mocha');
var nodemon = require('./lib').npmBin('nodemon');
var path = require('path');
var phantomjs = require('./lib').npmBin('phantomjs');
var Promise = require('bluebird');

namespace('test', function() {
  desc('Run all tests');
  task('all', function() {
    process.env.watch = null;
    return new Promise(function(resolve) {
      console.log('\nCode testing\n------------');
      process.env.reporter = process.env.codereporter;
      jake.Task['test:code'].addListener('complete', function() {
        console.log('\nSite testing\n------------')
        process.env.reporter = process.env.sitereporter;
        jake.Task['test:site'].addListener('complete', resolve).execute();
      }).execute();
    });
  });

  desc('Run code-based tests using Karma');
  task('code', ['bower:install', 'clean:web'], function() {
    var args = ['start', path.resolve('test', 'karma.conf.js')];

    // Check for reporter
    if(process.env.reporter) {
      args.push('--reporters');
      args.push(process.env.reporter);
    }

    // Set browsers options if available
    if(process.env.browsers) {
      args.push('--browsers');
      args.push(process.env.browsers);
    }

    // Default behavior is to run tests once
    if(process.env.watch !== 'true' && process.env.watch !== 'server') {
      return new Promise(function(resolve) {
        jake.Task['build:dev'].addListener('complete', function() {
          args.push('--single-run');
          resolve(karma.execute(args));
        })
        .execute();
      });
    }
    // Also tests can be run continuously
    else {
      if(process.env.watch === 'server') {
        var server = brunch.execute('watch', '--server', '--env', 'web:dev');
      }
      else {
        var server = brunch.execute('watch', '--env', 'web:dev');
      }
      return new Promise(function(resolve, reject) {
        server.catch(reject);
        var id = setInterval(function() {
          try { // Check if public folder is not empty
            var publicReady = !!jake.readdirR(config.paths.public).length
          }
          catch(e) {
          }

          if(typeof publicReady !== 'undefined' && publicReady) {
            clearInterval(id);
            args.push('--no-single-run');
            karma.execute(args).then(resolve, reject);
          }
        }, 1000);
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
    var server = brunch.execute('watch', '--server', '--env', 'web:prod');
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
        // Check if public folder is not empty
        try {
          var publicReady = !!jake.readdirR(config.paths.public).length
        }
        catch(e) {
        }

        if(typeof publicReady !== 'undefined' && publicReady) {
          clearInterval(id);
          if(process.env.watch === 'true') {
            args.unshift(path.resolve('node_modules', '.bin', 'mocha'));
            args.unshift(path.resolve('test', 'site'));
            args.unshift('--watch');
            args.unshift(config.paths.public);
            args.unshift('--watch');
            nodemon.execute(args).then(resolve, reject);
          }
          else {
            mocha.execute(args).then(resolve, reject);
          }
        }
      }, 1000);
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
