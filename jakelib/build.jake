// Brunch build tasks
var Promise = require('bluebird');

namespace('build', function() {
  desc('Build project for development');
  task('dev', ['bower:install', 'clean:web'], function() {
    return new Promise(function(resolve) {
      jake.exec('./node_modules/.bin/brunch b -e web:dev', {interactive: true}, resolve);
    });
  });

  desc('Build project for production');
  task('prod', ['bower:install', 'clean:web'], function() {
    return new Promise(function(resolve) {
      jake.exec('./node_modules/.bin/brunch b -e web:prod', {interactive: true}, resolve);
    });
  });
});

namespace('watch', function() {
  desc('Build project for development and rebuild on changes');
  task('dev', ['bower:install', 'clean:web'], function() {
    return new Promise(function(resolve) {
      jake.exec('./node_modules/.bin/brunch w -e web:dev', {interactive: true}, resolve);
    });
  });

  desc('Build project for production and rebuild on changes');
  task('prod', ['bower:install', 'clean:web'], function() {
    return new Promise(function(resolve) {
      jake.exec('./node_modules/.bin/brunch w -e web:prod', {interactive: true}, resolve);
    });
  });
});

namespace('server', function() {
  desc('Build project for development, rebuild on changes, and host locally');
  task('dev', ['bower:install', 'clean:web'], function() {
    return new Promise(function(resolve) {
      jake.exec('./node_modules/.bin/brunch w -s -e web:dev', {interactive: true}, resolve);
    });
  });

  desc('Build project for production, rebuild on changes, and host locally');
  task('prod', ['bower:install', 'clean:web'], function() {
    return new Promise(function(resolve) {
      jake.exec('./node_modules/.bin/brunch w -s -e web:prod', {interactive: true}, resolve);
    });
  });
});