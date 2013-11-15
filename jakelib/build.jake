// Brunch build tasks
var devices = require('./lib').devices;
var execute = require('./lib').execute;
var localBinCommand = require('./lib').localBinCommand;
var resolvePath = require('./lib').resolvePath;

var projectPath = resolvePath('cordova');

namespace('build', function() {
  desc('Build project (web or device) for development');
  task('dev', ['bower:install'], function() {
    var device = process.env.device;

    validateDevice(device);
    if(device) {
      jake.Task['clean:cordova'].invoke();
      return execute(localBinCommand('brunch', 'b -e cordova:dev')).then(function() {
        if(device !== 'none') {
          var command = localBinCommand('cordova', '-d build ' + device);
          return execute(command, {cwd: projectPath});
        }
      });
    }
    else {
      jake.Task['clean:web'].invoke();
      return execute(localBinCommand('brunch', 'b -e web:dev'));
    }
  });

  desc('Build project (web or device) for production');
  task('prod', ['bower:install'], function() {
    var device = process.env.device;

    validateDevice(device);
    if(device) {
      jake.Task['clean:cordova'].invoke();
      return execute(localBinCommand('brunch', 'b -e cordova:prod')).then(function() {
        if(device !== 'none') {
          return execute(localBinCommand('cordova', '-d build ' + device), {cwd: projectPath});
        }
      });
    }
    else {
      jake.Task['clean:web'].invoke();
      return execute(localBinCommand('brunch', 'b -e web:prod'));
    }
  });
});

namespace('watch', function() {
  desc('Build project for development and rebuild on changes');
  task('dev', ['bower:install', 'clean:web'], function() {
    return execute(localBinCommand('brunch', 'w -e web:dev'));
  });

  desc('Build project for production and rebuild on changes');
  task('prod', ['bower:install', 'clean:web'], function() {
    return execute(localBinCommand('brunch', 'w -e web:prod'));
  });
});

namespace('server', function() {
  desc('Build project for development, rebuild on changes, and host locally');
  task('dev', ['bower:install', 'clean:web'], function() {
    return execute(localBinCommand('brunch', 'w -s -e web:dev'));
  });

  desc('Build project for production, rebuild on changes, and host locally');
  task('prod', ['bower:install', 'clean:web'], function() {
    return execute(localBinCommand('brunch', 'w -s -e web:prod'));
  });
});

function validateDevice(device) {
  if(device && devices.indexOf(device) === -1 && device !== 'none') {
    fail('Device is not available');
  }
}
