// These are tasks that are undocumented, as they tend to be used by other tasks.
require('sugar');
var config = require('../brunch-config').config;
var scaffolt = require('./lib').npmBin('scaffolt');
var platforms = require('../setup/platform').platforms;

// Set default task to list available tasks
task('default', function() {
  jake.run('-T');
});

// Tasks that are used to clean build directories from Brunch
namespace('clean', function() {
  platforms.forEach(function(platform) {
    var publicPath = config.overrides[platform + ':dev'].paths.public;
    task(platform, function() {
      jake.rmRf(publicPath, {silent: true});
    });
  });
});

// General task to run Scaffolt. gen/del require a name, while add/rem
// uses placeholder text since it is not used. (in fact, the text
// 'placeholder' is used)
namespace('scaffold', function() {
  task('gen', function(type, name) {
    return scaffolt.execute(type, name);
  });

  task('del', function(type, name) {
    return scaffolt.execute(type, name, '--revert');
  });

  task('add', function(type) {
    return scaffolt.execute(type, 'placeholder');
  });

  task('rem', function(type) {
    return scaffolt.execute(type, 'placeholder', '--revert');
  });
});
