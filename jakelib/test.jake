// Test-related tasks
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var spawn = require('child_process').spawn;
var config = require('../brunch-config').config;

namespace('test', function() {
  desc('Run all tests');
  task('all', ['bower:install', 'clean:web'], function() {
    return new Promise(function(resolve) {
      jake.Task['test:white'].addListener('complete', function() {
        jake.Task['test:black'].addListener('complete', resolve).execute();
      }).execute();
    });
  });

  desc('Run whitebox tests using mocha-phantomjs');
  task('white', ['bower:install', 'clean:web'], function() {
    // Start local server
    var server = spawn('./node_modules/.bin/brunch', 'w -s -e web:dev'.split(' '), {stdio: 'inherit'});

    return new Promise(function(resolve, reject) {
      var testPath = path.resolve(config.overrides['web:dev'].paths.public, 'index.html');

      // Catch for Ctrl-C
      process.on('SIGINT', reject);

      // Keep checking to see if tests file are generated.
      // Once they are, run mocha-phantomjs.
      var id = setInterval(function() {
        if(fs.existsSync(testPath)) {
          clearInterval(id);

          var command = './node_modules/.bin/mocha-phantomjs http://localhost:3333/test';
          if(process.env.reporter) {
            command += ' -R ' + process.env.reporter;
          }

          var phantom = jake.createExec(command, {interactive: true}, resolve);
          phantom.addListener('error', reject);
          phantom.run();
        }
      }, 1000);
    })
    .finally(function() {
      server.kill();
    });
  });

  desc('Run blackbox tests using Lotte');
  task('black', function() {
    // Start local server
    var server = spawn('./node_modules/.bin/brunch', 'w -s -e web:dev'.split(' '), {stdio: 'inherit'});

    return new Promise(function(resolve, reject) {
      var testPath = path.resolve(config.overrides['web:dev'].paths.public, 'index.html');

      // Catch for Ctrl-C
      process.on('SIGINT', reject);

      // Keep checking to see if tests file are generated.
      // Once they are, run mocha-phantomjs.
      var id = setInterval(function() {
        if(fs.existsSync(testPath)) {
          clearInterval(id);
          var lotte = jake.createExec('./node_modules/.bin/lotte test/black -I "**/*-test.{coffee,js}"', {interactive: true}, resolve);
          lotte.addListener('error', reject);
          lotte.run();
        }
      }, 1000);
    })
    .finally(function() {
      server.kill();
    });
  });
});