// Test-related tasks
var config = require('../brunch-config').config.overrides['web:dev'];
var execute = require('./lib').execute;
var localBinCommand = require('./lib').localBinCommand;
var path = require('path');
var Promise = require('bluebird');
var resolvePath = require('./lib').resolvePath;

var publicPath = resolvePath(config.paths.public);

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
    var configFile = resolvePath('test/karma.conf.js');
    var reporter = process.env.reporter ? ' --reporters ' + process.env.reporter : '';
    var command = localBinCommand('karma', 'start ' + configFile + reporter);

    // Default behavior is to run tests once
    if(process.env.watch !== 'true') {
      return new Promise(function(resolve) {
        jake.Task['build:dev'].addListener('complete', function() {
          console.log('');
          resolve(execute(command + ' --single-run'));
        })
        .execute();
      });
    }
    // Also tests can be run continuously
    else {
      var server = execute(localBinCommand('brunch', 'w -e web:dev'));
      return new Promise(function(resolve, reject) {
        server.catch(reject);
        var id = setInterval(function() {
          try { // Check if public folder is not empty
            var publicReady = !!jake.readdirR(publicPath).length
          }
          catch(e) {
          }

          if(typeof publicReady !== 'undefined' && publicReady) {
            clearInterval(id);
            execute(command + ' --no-single-run').then(resolve, reject);
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
    var phantom = execute(localBinCommand('phantomjs', '--webdriver=4444'));
    var server = execute(localBinCommand('brunch', 'w -s -e web:prod'));
    var reporter = process.env.reporter ? '-R ' + process.env.reporter : '';
    var command = localBinCommand('mocha', reporter);

    // Set up tests that are to run continuously using nodemon
    if(process.env.watch === 'true') {
      var args = '--watch ' + publicPath;
      args += ' --watch ' + resolvePath('test/site');
      command = localBinCommand('nodemon', args + ' ' + command);
    }

    return new Promise(function(resolve, reject) {
      phantom.catch(reject);
      server.catch(reject);
      var id = setInterval(function() {
        // Check if public folder is not empty
        try {
          var publicReady = !!jake.readdirR(publicPath).length
        }
        catch(e) {
        }

        if(typeof publicReady !== 'undefined' && publicReady) {
          clearInterval(id);
          execute(command).then(resolve, reject);
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
