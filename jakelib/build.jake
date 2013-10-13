// Brunch build tasks

namespace('build', function() {
  desc('Build project for development');
  task('dev', ['bower:install', 'clean:web'], function() {
    jake.exec('./node_modules/.bin/brunch b -e web:dev', {printStdout: true, printStderr: true});
  });

  desc('Build project for production');
  task('prod', ['bower:install', 'clean:web'], function() {
    jake.exec('./node_modules/.bin/brunch b -e web:prod', {printStdout: true, printStderr: true});
  });
});

namespace('watch', function() {
  desc('Build project for development and rebuild on changes');
  task('dev', ['bower:install', 'clean:web'], function() {
    jake.rmRf(config.overrides['web:dev'].paths.public, {silent: true});
    jake.exec('./node_modules/.bin/brunch w -e web:dev', {printStdout: true, printStderr: true});
  });

  desc('Build project for production and rebuild on changes');
  task('prod', ['bower:install', 'clean:web'], function() {
    jake.exec('./node_modules/.bin/brunch w -e web:prod', {printStdout: true, printStderr: true});
  });
});

namespace('server', function() {
  desc('Build project for development, rebuild on changes, and host locally');
  task('dev', ['bower:install', 'clean:web'], function() {
    jake.exec('./node_modules/.bin/brunch w -s -e web:dev', {printStdout: true, printStderr: true});
  });

  desc('Build project for production, rebuild on changes, and host locally');
  task('prod', ['bower:install', 'clean:web'], function() {
    jake.exec('./node_modules/.bin/brunch w -s -e web:prod', {printStdout: true, printStderr: true});
  });
});