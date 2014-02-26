'use strict';

// These are tasks that are undocumented, as they tend to be used by other tasks.
var config = require('../brunch-config').config;

// Tasks that are used to clean build directories from Brunch
namespace('clean', function() {
  task('web', function() {
    jake.rmRf(config.paths.public, {silent: true});
  });
});
