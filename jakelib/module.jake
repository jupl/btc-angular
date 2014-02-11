'use strict';

// Tasks to add modules to the project that are not included by default.
// This is usually either Bower packages or NPM packages.
var fs = require('fs');
var bower = require('./lib').npmBin('bower');
var npm = require('./lib').bin('npm');

namespace('add', function() {
  desc('Add testing modules');
  task('testing', function() {
    // Hack to avoid adding extra Karma packages to package.json
    var pkg = JSON.parse(fs.readFileSync('package.json'));
    pkg.devDependencies['karma-chai-plugins'] = '~0.2.0';
    pkg.devDependencies['karma-detect-browsers'] = '~0.1.2';
    pkg.devDependencies['karma-mocha'] = '~0.1.1';
    pkg.devDependencies['chai'] = '~1.9.0';
    pkg.devDependencies['mocha'] = '~1.17.1';
    pkg.devDependencies['mocha-as-promised'] = '~2.0.0';
    pkg.devDependencies['nodemon'] = '~1.0.14';
    pkg.devDependencies['phantomjs'] = '~1.9.2';
    pkg.devDependencies['selenium-webdriver'] = '~2.39.0';
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
    return npm.execute('install').then(function() {
      return bower.execute('install', '--allow-root', '--save',
        'angular-mocks#' + require('../bower').dependencies.angular);
    });
  });

  desc('Add server extras');
  task('serverextras', function() {
    return npm.execute('install', '--save-dev',
      'bcryptjs@~0.7.10',
      'connect-mongo@~0.4.0',
      'mongoose@~3.8.6',
      'passport@~0.2.0',
      'passport-local@~0.1.6',
      'prerender-node@~0.1.15');
  });

  desc('Add jQuery');
  task('jquery', function() {
    return bower.execute('install', '--allow-root', '--save', 'jquery#~2.1.0');
  });

  desc('Add normalize.css');
  task('normalize', function() {
    return bower.execute('install', '--allow-root', '--save',
      'normalize-css#~3.0.0');
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
      'selenium-webdriver')
    .then(function() {
      return bower.execute('uninstall', '--allow-root', '--save',
        'angular-mocks');
    });
  });

  desc('Remove Server extras');
  task('serverextras', function() {
    return npm.execute('uninstall', '--save-dev',
      'bcryptjs',
      'connect-mongo',
      'mongoose',
      'passport',
      'passport-local',
      'prerender-node');
  });

  desc('Remove jQuery');
  task('jquery', function() {
    return bower.execute('uninstall', '--allow-root', '--save', 'jquery');
  });

  desc('Remove normalize.css');
  task('normalize', function() {
    editBower(function() {
    return bower.execute('uninstall', '--allow-root', '--save',
      'normalize-css');
    });
  });
});
