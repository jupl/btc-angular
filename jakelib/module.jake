// Tasks to add modules to the project that are not included by default.
// This is usually either Bower packages or module-based Scaffolt generators.
var generators = require('./lib').generators;
var jsonfile = require('jsonfile');
var Promise = require('bluebird');

namespace('add', function() {
  desc('Add jQuery');
  task('jquery', function() {
    editBower(function() {
      this.dependencies.jquery = '~2.1.0';
    });
  });

  desc('Add normalize.css');
  task('normalize', function() {
    editBower(function() {
      this.dependencies['normalize-css'] = '~3.0.0';
    });
  });

  desc('Add device.js (device information for CSS and JS)');
  task('devicejs', function() {
    editBower(function() {
      this.dependencies.devicejs = 'git://github.com/matthewhudson/device.js.git';
      this.overrides.devicejs = {
        main: 'lib/device.js'
      };
    });
  });

  generators.forEach(function(generator) {
    if(generator.isModule) {
      desc('Add ' + generator.description);
      task(generator.task, function() {
        return new Promise(function(resolve) {
          jake.Task['scaffold:add']
          .addListener('complete', resolve)
          .invoke(generator.name);
        });
      });
    }
  });
});

namespace('rem', function() {
  desc('Remove jQuery');
  task('jquery', function() {
    editBower(function() {
      delete this.dependencies.jquery;
    });
  });

  desc('Remove normalize.css');
  task('normalize', function() {
    editBower(function() {
      delete this.dependencies['normalize-css'];
    });
  });

  desc('Remove device.js');
  task('devicejs', function() {
    editBower(function() {
      delete this.dependencies.devicejs;
      delete this.overrides.devicejs;
    });
  });

  generators.forEach(function(generator) {
    if(generator.isModule) {
      desc('Remove ' + generator.description);
      task(generator.task, function() {
        return new Promise(function(resolve) {
          jake.Task['scaffold:rem']
          .addListener('complete', resolve)
          .invoke(generator.name);
        });
      });
    }
  });
});

function editBower(callback) {
  var json = jsonfile.readFileSync('bower.json');
  callback.call(json);
  jsonfile.writeFileSync('bower.json', json);
}
