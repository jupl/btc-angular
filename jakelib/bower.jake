// Bower related tasks
var bower = require('./lib').npmBin('bower');

namespace('bower', function() {
  desc('Download and install Bower components');
  task('install', function() {
    return bower.execute('install', '--allow-root');
  });

  desc('Clear Bower components');
  task('clean', function() {
    jake.rmRf('bower_components');
  });
});
