// Brunch build tasks
var brunch = require('./lib').npmBin('brunch');

namespace('build', function() {
  desc('Build project for development');
  task('dev', ['bower:install', 'clean:web'], function() {
    return brunch.execute('build', '--env', 'web:dev');
  });

  desc('Build project for production');
  task('prod', ['bower:install', 'clean:web'], function() {
    return brunch.execute('build', '--env', 'web:prod');
  });
});

namespace('watch', function() {
  desc('Build project for development and rebuild on changes');
  task('dev', ['bower:install', 'clean:web'], function() {
    return brunch.execute('watch', '--env', 'web:dev');
  });

  desc('Build project for production and rebuild on changes');
  task('prod', ['bower:install', 'clean:web'], function() {
    return brunch.execute('watch', '--env', 'web:prod');
  });
});

namespace('server', function() {
  desc('Build project for development, rebuild on changes, and host locally');
  task('dev', ['bower:install', 'clean:web'], function() {
    return brunch.execute('watch', '--server', '--env', 'web:dev');
  });

  desc('Build project for production, rebuild on changes, and host locally');
  task('prod', ['bower:install', 'clean:web'], function() {
    return brunch.execute('watch', '--server', '--env', 'web:prod');
  });
});
