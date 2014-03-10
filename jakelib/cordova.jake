// Cordova-based build tasks
require('sugar');
var path = require('path');
var cordova = require('./lib').bin(path.resolve('node_modules/.bin/cordova'));
var devices = require('./lib').devices;
var Promise = require('bluebird');

namespace('emulate', function() {
  desc('Build project for development and simulate/emulate on a device');
  task('dev', function() {
    var device = process.env.device;

    validateDevice(device);
    process.env.device = 'none'; // Don't run Cordova in build:dev
    return new Promise(function(resolve) {
      jake.Task['build:dev'].addListener('complete', resolve).invoke();
    })
    .then(function() {
      cordova.options.cwd = 'cordova';
      return cordova.execute('--verbose', 'emulate', device);
    });
  });

  desc('Build project for production and simulate/emulate on a device');
  task('prod', function() {
    var device = process.env.device;

    validateDevice(device);
    process.env.device = 'none'; // Don't run Cordova in build:prod
    return new Promise(function(resolve) {
      jake.Task['build:prod'].addListener('complete', resolve).invoke();
    })
    .then(function() {
      cordova.options.cwd = 'cordova';
      return cordova.execute('--verbose', 'emulate', device);
    });
  });
});

namespace('cordova', function() {
  desc('Initialize Cordova builds by generating a Cordova project');
  task('init', function() {
    var name = process.env.name;
    var package = process.env.package;

    validateProject(package, name);
    if(package) {
      if(name) {
        name = name.camelize();
      }
      else {
        name = '';
      }
    }
    else {
      package = '';
      name = '';
    }

    var args = ['--verbose', 'create', 'cordova', package, name];
    jake.rmRf('cordova', {silent: true});
    return cordova.execute(args);
  });

  desc('List installed device platforms and plugins');
  task('ls', function() {
    cordova.options.cwd = 'cordova';
    return cordova.execute(['--verbose', 'platform', 'ls']).then(function() {
      return cordova.execute(['--verbose', 'plugin', 'ls']);
    });
  });

  desc('Add a device/plugin to the Cordova project');
  task('add', function() {
    var device = process.env.device;
    var plugin = process.env.plugin;
    var promises = [];

    // Check if device is valid (assuming it was provided)
    validateDevice(device);

    // Add device if given
    if(device) {
      var args = ['--verbose', 'platform', 'add', device];
      cordova.options.cwd = 'cordova';
      promises.push(cordova.execute(args).then(function() {
        var origin = path.resolve('jakelib', 'assets', device + '.gitignore');
        var dest = path.resolve('cordova', 'platforms', device, '.gitignore');
        jake.cpR(origin, dest);
      }));
    }

    // Add plugin if given
    if(plugin) {
      var args = ['--verbose', 'plugin', 'add', plugin];
      cordova.options.cwd = 'cordova';
      promises.push(cordova.execute(args));
    }

    // Check if promises have been made. If not, list available types.
    if(promises.length) {
      return Promise.all(promises);
    }
    else {
      listTypes();
    }
  });

  desc('Remove a device/plugin from the Cordova project');
  task('rem', function() {
    var device = process.env.device;
    var plugin = process.env.plugin;
    var promises = [];

    // Check if device is valid (assuming it was provided)
    validateDevice(device);

    // Add if device is given
    if(device) {
      var args = ['--verbose', 'platform', 'remove', device];
      cordova.options.cwd = 'cordova';
      promises.push(cordova.execute(args));
    }

    // Add if plugin is given
    if(plugin) {
      var args = ['--verbose', 'plugin', 'remove', plugin];
      cordova.options.cwd = 'cordova';
      promises.push(cordova.execute(args));
    }

    // Check if promises have been made. If not, list available types.
    if(promises.length) {
      return Promise.all(promises);
    }
    else {
      listTypes();
    }
  });

  desc('Update a device platform');
  task('update', function() {
    var device = process.env.device;
    var args = ['--verbose', 'platform', 'update', device];

    validateDevice(device, true);
    cordova.options.cwd = 'cordova';
    return cordova.execute(args);
  });
});

function validateProject(packageName, appName) {
  if(packageName && !/(\w+\.)+\w+/.test(packageName)) {
    fail('Invalid package name');
  }
  else if(appName && !packageName) {
    fail('Package name required');
  }
}

function listTypes() {
  console.log('Specify either a device or plugin');
}

function validateDevice(device, required) {
  if(required && !device) {
    fail('Device name required');
  }
  else if(device && devices.indexOf(device) === -1) {
    fail('Device is not available');
  }
}

function validatePlugin(plugin) {
  // Throw Jake fails here if it does not validate
}
