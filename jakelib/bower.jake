// Bower related tasks
namespace('bower', function() {
  desc('Download and install Bower components');
  task('install', function() {
    jake.exec('./node_modules/.bin/bower install', {printStdout: true, printStderr: true});
  });
});