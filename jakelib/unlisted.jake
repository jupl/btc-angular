// These are tasks that are undocumented, as they tend to be used by other tasks.
require('sugar');
var config = require('../brunch-config').config;
var execute = require('./lib').execute;
var localBinCommand = require('./lib').localBinCommand;
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
  task('gen', function(type) {
    var name = process.env.name;
    validateName(name);
    return execute(localBinCommand('scaffolt', type + ' ' + name));
  });

  task('del', function(type) {
    var name = process.env.name;
    validateName(name);
    return execute(localBinCommand('scaffolt', type + ' ' + name + ' -r'));
  });

  task('add', function(type) {
    return execute(localBinCommand('scaffolt', type + ' placeholder'));
  });

  task('rem', function(type) {
    return execute(localBinCommand('scaffolt', type + ' placeholder -r'));
  });
});

function validateName(name) {
  if(!name) {
    fail('name parameter is required. ex: jake ... name=[name]');
  }
}
