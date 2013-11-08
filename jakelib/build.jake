// Brunch build tasks
var execute = require('./lib').execute;
var localBinCommand = require('./lib').localBinCommand;

namespace('build', function() {
  desc('Build project for development');
  task('dev', ['bower:install', 'clean:web'], function() {
    return execute(localBinCommand('brunch', 'b -e web:dev'));
  });

  desc('Build project for production');
  task('prod', ['bower:install', 'clean:web'], function() {
    return execute(localBinCommand('brunch', 'b -e web:prod'));
  });
});

namespace('watch', function() {
  desc('Build project for development and rebuild on changes');
  task('dev', ['bower:install', 'clean:web'], function() {
    return execute(localBinCommand('brunch', 'w -e web:dev'));
  });

  desc('Build project for production and rebuild on changes');
  task('prod', ['bower:install', 'clean:web'], function() {
    return execute(localBinCommand('brunch', 'w -e web:prod'));
  });
});

namespace('server', function() {
  desc('Build project for development, rebuild on changes, and host locally');
  task('dev', ['bower:install', 'clean:web'], function() {
    return execute(localBinCommand('brunch', 'w -s -e web:dev'));
  });

  desc('Build project for production, rebuild on changes, and host locally');
  task('prod', ['bower:install', 'clean:web'], function() {
    return execute(localBinCommand('brunch', 'w -s -e web:prod'));
  });
});
