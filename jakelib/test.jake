// Test-related tasks
var config = require('../brunch-config').config.overrides['web:dev'];
var execute = require('./lib').execute;
var localBinCommand = require('./lib').localBinCommand;
var path = require('path');
var Promise = require('bluebird');

namespace('test', function() {
  desc('Run all tests');
  task('all', function() {
    return new Promise(function(resolve) {
      console.log('Code testing\n------------');
      jake.Task['test:code'].addListener('complete', function() {
        console.log('Site testing\n------------')
        jake.Task['test:site'].addListener('complete', resolve).execute();
      }).execute();
    });
  });

  desc('Run code-based tests using Mocha PhantomJS');
  task('code', ['bower:install', 'clean:web'], function() {
    var server = execute(localBinCommand('brunch', 'w -s -e web:dev'));
    var reporter = process.env.reporter ? '-R ' + process.env.reporter : '';
    var url = 'http://localhost:' + config.server.port + '/test';
    var command = localBinCommand('mocha-phantomjs', url + ' ' + reporter);

    return new Promise(function(resolve, reject) {
      server.catch(reject);
      var id = setInterval(function() {
        // Check if public folder is not empty
        var publicReady;
        try {
          publicReady = !!jake.readdirR(config.paths.public).length
        }
        catch(e) {
        }

        if(publicReady) {
          clearInterval(id);
          execute(command).then(resolve, reject);
        }
      }, 1000);
    })
    // Make sure to stop server on success or fail
    .finally(function() {
      if(!server.isFulfilled()) {
        server.cancel();
      }
    });
  });

  desc('Run site-based tests using PhantomJS and WebDriverJS');
  task('site', ['bower:install', 'clean:web'], function() {
    var phantom = execute(localBinCommand('phantomjs', '--webdriver=4444'));
    var server = execute(localBinCommand('brunch', 'w -s -e web:dev'));
    var reporter = process.env.reporter ? '-R ' + process.env.reporter : '';
    var command = localBinCommand('mocha', reporter);

    return new Promise(function(resolve, reject) {
      phantom.catch(reject);
      server.catch(reject);
      var id = setInterval(function() {
        // Check if public folder is not empty
        var publicReady;
        try {
          publicReady = !!jake.readdirR(config.paths.public).length
        }
        catch(e) {
        }

        if(publicReady) {
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
