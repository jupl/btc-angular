'use strict';

// Tasks to add modules to the project that are not included by default.
// This is usually either Bower packages or NPM packages.
var fs = require('fs');
var npm = require('./lib').bin('npm');

namespace('add', function() {
  desc('Add testing modules');
  task('testing', function() {
    editPackage(function() {
      this.devDependencies['karma-chai-plugins'] = '~0.2.0';
      this.devDependencies['karma-detect-browsers'] = '~0.1.2';
      this.devDependencies['karma-mocha'] = '~0.1.1';
      this.devDependencies['chai'] = '~1.9.0';
      this.devDependencies['mocha'] = '~1.17.1';
      this.devDependencies['mocha-as-promised'] = '~2.0.0';
      this.devDependencies['nodemon'] = '~1.0.14';
      this.devDependencies['phantomjs'] = '~1.9.2';
      this.devDependencies['selenium-webdriver'] = '~2.39.0';
    });
    return npm.execute('install');
  });

  desc('Add jQuery');
  task('jquery', function() {
    editBower(function() {
      this.dependencies['jquery'] = '~2.1.0';
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
  desc('Remove testing modules');
  task('testing', function() {
    return npm.execute('uninstall', '--save-dev',
      'karma-chai-plugins',
      'karma-detect-browsers',
      'karma-mocha',
      'chai',
      'mocha',
      'mocha-as-promised',
      'nodemon',
      'phantomjs',
      'selenium-webdriver');
  });

  desc('Remove jQuery');
  task('jquery', function() {
    editBower(function() {
      delete this.dependencies['jquery'];
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
  var json = JSON.parse(fs.readFileSync('bower.json'));
  callback.call(json);
  fs.writeFileSync('bower.json', JSON.stringify(json, null, 2) + '\n');
}

function editPackage(callback) {
  var json = JSON.parse(fs.readFileSync('package.json'));
  callback.call(json);
  fs.writeFileSync('package.json', JSON.stringify(json, null, 2) + '\n');
}
