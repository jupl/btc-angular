'use strict';

// Tasks to add modules to the project that are not included by default.
// This is usually either Bower packages or NPM packages.
var bower = require('./lib').npmBin('bower');
var npm = require('./lib').bin('npm');

namespace('add', function() {
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
