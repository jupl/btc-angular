'use strict';

// These are tasks that are undocumented, as they tend to be used by other tasks.
var config = require('../brunch-config').config;
var scaffolt = require('./lib').npmBin('scaffolt');

// Tasks that are used to clean build directories from Brunch
namespace('clean', function() {
  task('web', function() {
    jake.rmRf(config.paths.public, {silent: true});
  });
});

// General task to run Scaffolt.
namespace('scaffold', function() {
  task('gen', function(type, name) {
    return scaffolt.execute(type, name);
  });

  task('del', function(type, name) {
    return scaffolt.execute(type, name, '--revert');
  });
});
