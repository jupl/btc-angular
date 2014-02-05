// Tasks to add modules to the project that are not included by default.
// This is usually either Bower packages or module-based Scaffolt generators.
var generators = require('./lib').generators;
var jsonfile = require('jsonfile');
var npm = require('./lib').bin('npm');

namespace('add', function() {
  desc('Add support for code testing');
  task('codetesting', function() {
    editBower(function() {
      this.dependencies.chai = '~1.9.0';
      this.dependencies.mocha = '~1.17.0';
      this.dependencies.sinon = 'http://sinonjs.org/releases/sinon-1.7.3.js';
      this.dependencies['sinon-chai'] = '~2.4.0';
      this.overrides.mocha = {
        "main": [
          "mocha.css",
          "mocha.js"
        ]
      };
      this.overrides['sinon-chai'] = {
        "main": "lib/sinon-chai.js",
        "dependencies": {
          "sinon": "*",
          "chai": "*"
        }
      };
    });
    return npm.execute('install',
      'karma@~0.10.14',
      'karma-chai-plugins@~0.2.0',
      'karma-mocha@~0.1.0',
      '--save-dev');
  });

  desc('Add support for site testing');
  task('sitetesting', function() {
    return npm.execute('install',
      'chai@~1.9.0',
      'mocha@~1.17.0',
      'mocha-as-promised@~2.0.0',
      'nodemon@~1.0.8',
      'selenium-webdriver@~2.39.0',
      '--save-dev');
  });

  desc('Add Prerender');
  task('prerender', function() {
    return npm.execute('install', 'prerender@~2.0.1', 'prerender-node@~0.1.15', '--save');
  });

  desc('Add jQuery');
  task('jquery', function() {
    editBower(function() {
      this.dependencies.jquery = '~2.1.0';
    });
  });

  desc('Add normalize.css');
  task('normalize', function() {
    editBower(function() {
      this.dependencies['normalize-css'] = '~3.0.0';
    });
  });
});

namespace('rem', function() {
  desc('Remove support for code testing');
  task('codetesting', function() {
    editBower(function() {
      delete this.dependencies.chai;
      delete this.dependencies.mocha;
      delete this.dependencies.sinon;
      delete this.dependencies['sinon-chai'];
      delete this.overrides.mocha;
      delete this.overrides['sinon-chai'];
    });
    return npm.execute('uninstall',
      'karma',
      'karma-chai-plugins',
      'karma-mocha',
      '--save-dev');
  });

  desc('Remove support for site testing');
  task('sitetesting', function() {
    return npm.execute('uninstall',
      'chai',
      'mocha',
      'mocha-as-promised',
      'nodemon',
      'selenium-webdriver',
      '--save-dev');
  });

  desc('Remove Prerender');
  task('prerender', function() {
    return npm.execute('uninstall', 'prerender', 'prerender-node', '--save');
  });

  desc('Remove jQuery');
  task('jquery', function() {
    editBower(function() {
      delete this.dependencies.jquery;
    });
  });

  desc('Remove normalize.css');
  task('normalize', function() {
    editBower(function() {
      delete this.dependencies['normalize-css'];
    });
  });
});

function editBower(callback) {
  var json = jsonfile.readFileSync('bower.json');
  callback.call(json);
  jsonfile.writeFileSync('bower.json', json);
}
