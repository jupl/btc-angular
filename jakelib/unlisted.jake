// These are tasks that are undocumented, as they tend to be used by other tasks.
var config = require('../brunch-config').config;
var scaffolt = require('./lib').npmBin('scaffolt');
var platforms = require('../setup/platform').platforms;

// Tasks that are used to clean build directories from Brunch
namespace('clean', function() {
  platforms.forEach(function(platform) {
    var publicPath = config.overrides[platform + ':dev'].paths.public;
    task(platform, function() {
      jake.rmRf(publicPath, {silent: true});
    });
  });
});

// General task to run Scaffolt.
namespace('scaffold', function() {
  task('gen', function(type, name) {
    return scaffolt.execute(type, name);
  });

  task('del', function(type, name) {
    return scaffolt.execute(type, name, '--revert');
  });
});
