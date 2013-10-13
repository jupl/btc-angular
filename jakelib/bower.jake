// Bower related tasks
var Promise = require('bluebird');

namespace('bower', function() {
  desc('Download and install Bower components');
  task('install', function() {
    return new Promise(function(resolve) {
      jake.exec('./node_modules/.bin/bower install', {interactive: true}, resolve);
    });
  });
});