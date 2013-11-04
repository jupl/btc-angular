// Test-related tasks
var config = require('../brunch-config').config.overrides['web:dev'];
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var spawn = require('child_process').spawn;
var util = require('util');

namespace('test', function() {
  desc('Run all tests');
  task('all', ['bower:install', 'clean:web'], function() {
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
    var server;

    return new Promise(function(resolve, reject) {
      var testPath = path.resolve(config.paths.public, 'index.html');
      server = spawn('./node_modules/.bin/brunch', ['w', '-s', '-e', 'web:dev'], {stdio: 'inherit'});

      // Catch for Ctrl-C
      process.on('SIGINT', reject);

      // Keep checking to see if files are generated.
      // Once they are, run mocha-phantomjs.
      var id = setInterval(function() {
        if(fs.existsSync(testPath)) {
          clearInterval(id);

          var command = util.format('./node_modules/.bin/mocha-phantomjs http://localhost:%d/test', config.server.port);
          if(process.env.reporter) {
            command += ' -R ' + process.env.reporter;
          }

          var tester = jake.createExec(command, {interactive: true}, resolve);
          tester.addListener('error', reject);
          tester.run();
        }
      }, 1000);
    })
    .finally(function() {
      if(server) {
        server.kill();
      }
    });
  });

  desc('Run site-based tests using PhantomJS and WebDriverJS');
  task('site', function() {
    var phantom;
    var server;

    return new Promise(function(resolve, reject) {
      var testPath = path.resolve(config.paths.public, 'index.html');
      phantom = spawn('./node_modules/.bin/phantomjs', ['--webdriver=4444']);
      server = spawn('./node_modules/.bin/brunch', ['w', '-s', '-e', 'web:dev'], {stdio: 'inherit'});

      // Catch for Ctrl-C
      process.on('SIGINT', reject);

      // Keep checking to see if files are generated.
      // Once they are, run tests.
      var id = setInterval(function() {
        if(fs.existsSync(testPath)) {
          clearInterval(id);

          var command = './node_modules/.bin/mocha';
          if(process.env.reporter) {
            command += ' -R ' + process.env.reporter;
          }

          var tester = jake.createExec(command, {interactive: true}, resolve);
          tester.addListener('error', reject);
          tester.run();
        }
      }, 1000);
    })
    .finally(function() {
      if(phantom) {
        phantom.kill();
      }
      if(server) {
        server.kill();
      }
    });
  });
});
