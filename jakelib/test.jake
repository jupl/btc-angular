// Test-related tasks
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var config = require('../brunch-config').config;

namespace('test', function() {
  desc('Run a test on the application using PhantomJS');
  task('phantom', ['bower:install', 'clean:web'], {async: true}, function() {
    // Start local server
    var server = spawn('./node_modules/.bin/brunch', 'w -s -e web:dev'.split(' '));
    var testPath = path.resolve(config.overrides['web:dev'].paths.public, 'test');

    // Ensure server process gets killed
    process.on('SIGINT', function() {
      server.kill();
      process.exit();
    });

    // Keep checking to see if tests file are generated.
    // Once they are, run mocha-phantomjs.
    var id = setInterval(function() {
      if(fs.existsSync(testPath)) {
        clearInterval(id);

        var command = './node_modules/.bin/mocha-phantomjs http://localhost:3333/test';
        if(process.env.reporter) {
          command += ' -R ' + process.env.reporter;
        }

        jake.exec(command, {printStdout: true, printStderr: true}, function() {
          server.kill();
          complete();
        });
      }
    }, 1000);
  });
});