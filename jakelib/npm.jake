// NPM related tasks
var npm = require('./lib').npmBin('npm');

namespace('npm', function() {
  desc('Clear Node packages');
  task('clean', function() {
    jake.rmRf('node_modules');
  });
});
