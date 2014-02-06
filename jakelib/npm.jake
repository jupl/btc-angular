// NPM related tasks
var npm = require('./lib').bin('npm');

namespace('npm', function() {
  desc('Clear Node packages');
  task('clean', function() {
    jake.rmRf('node_modules');
    return npm.execute('cache', 'clean');
  });
});
