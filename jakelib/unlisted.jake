// These are tasks that are undocumented, as they tend to be used by other tasks.
require('sugar');
var Promise = require('bluebird');
var util = require('util');
var config = require('../brunch-config').config;

// Set default task to list available tasks
task('default', function() {
  jake.run('-T');
});

// Tasks that are used to clean build directories from Brunch
namespace('clean', function() {
  task('web', function() {
    jake.rmRf(config.overrides['web:dev'].paths.public, {silent: true});
  });

  task('cordova', function() {
    jake.rmRf(config.overrides['cordova:dev'].paths.public, {silent: true});
  });
});

// General task to run Scaffolt. gen/del require a name, while add/rem
// uses placeholder text since it is not used. (in fact, the text
// 'placeholder' is used)
namespace('scaffold', function() {
  task('gen', function(type) {
    if(!process.env.name) {
      fail('name parameter is required. ex: jake gen:[type] name=[name]');
    }
    return new Promise(function(resolve) {
      jake.exec(util.format('./node_modules/.bin/scaffolt %s %s', type, process.env.name.dasherize()), {interactive: true}, resolve);
    });
  });

  task('del', function(type) {
    if(!process.env.name) {
      fail('name parameter is required. ex: jake del:[type] name=[name]');
    }
    return new Promise(function(resolve) {
      jake.exec(util.format('./node_modules/.bin/scaffolt %s %s -r', type, process.env.name.dasherize()), {interactive: true}, resolve);
    });
  });

  task('add', function(type) {
    return new Promise(function(resolve) {
      jake.exec(util.format('./node_modules/.bin/scaffolt %s placeholder', type), {interactive: true}, resolve);
    });
  });

  task('rem', function(type) {
    return new Promise(function(resolve) {
      jake.exec(util.format('./node_modules/.bin/scaffolt %s placeholder -r', type), {interactive: true}, resolve);
    });
  });
});
