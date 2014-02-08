// Tasks to add modules to the project that are not included by default.
// This is usually either Bower packages or module-based Scaffolt generators.
var generators = require('./lib').generators;
var jsonfile = require('jsonfile');
var npm = require('./lib').bin('npm');

namespace('add', function() {
  desc('Add support for testing (code/site)');
  task('testing', ['add:codetesting', 'add:sitetesting']);

  desc('Add support for code testing');
  task('codetesting', function() {
    editBower(function() {
      this.dependencies.chai = '~1.9.0';
      this.dependencies.mocha = '~1.17.1';
      this.dependencies.sinon = 'http://sinonjs.org/releases/sinon-1.7.3.js';
      this.dependencies['sinon-chai'] = '~2.5.0';
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
    editPackage(function() {
      this.devDependencies.karma = '~0.10.9';
      this.devDependencies['karma-chai-plugins'] = '~0.2.0';
      this.devDependencies['karma-mocha'] = '~0.1.1';
    });
    return npm.execute('install');
  });

  desc('Add support for site testing');
  task('sitetesting', function() {
    editPackage(function() {
      this.devDependencies.chai = '~1.9.0';
      this.devDependencies.mocha = '~1.17.1';
      this.devDependencies['mocha-as-promised'] = '~2.0.0';
      this.devDependencies.nodemon = '~1.0.14';
      this.devDependencies['selenium-webdriver'] = '~2.39.0';
    });
    return npm.execute('install');
  });

  desc('Add server extras');
  task('serverextras', function() {
    editPackage(function() {
      this.dependencies.bcryptjs = '~0.7.10';
      this.dependencies.mongoose = '~3.8.6';
      this.dependencies.passport = '~0.2.0';
      this.dependencies['connect-mongo'] = '~0.4.0';
      this.dependencies['passport-local'] = '~0.1.6';
      this.dependencies['prerender-node'] = '~0.1.15';
    });
    return npm.execute('install');
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
  desc('Remove support for testing (code/site)');
  task('testing', ['rem:codetesting', 'rem:sitetesting']);

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
    editPackage(function() {
      delete this.devDependencies.karma;
      delete this.devDependencies['karma-chai-plugins'];
      delete this.devDependencies['karma-mocha'];
    });
  });

  desc('Remove support for site testing');
  task('sitetesting', function() {
    editPackage(function() {
      delete this.devDependencies.chai;
      delete this.devDependencies.mocha;
      delete this.devDependencies['mocha-as-promised'];
      delete this.devDependencies.nodemon;
      delete this.devDependencies['selenium-webdriver'];
    });
  });

  desc('Remove Server extras');
  task('serverextras', function() {
    editPackage(function() {
      delete this.dependencies.bcryptjs;
      delete this.dependencies.mongoose;
      delete this.dependencies.passport;
      delete this.dependencies['connect-mongo'];
      delete this.dependencies['passport-local'];
      delete this.dependencies['prerender-node'];
    });
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

function editPackage(callback) {
  var json = jsonfile.readFileSync('package.json');
  callback.call(json);
  jsonfile.writeFileSync('package.json', json);
}
