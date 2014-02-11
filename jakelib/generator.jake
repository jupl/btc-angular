'use strict';

// Scaffolt generator tasks
var generators = require('./lib').generators;
var scaffolt = require('./lib').npmBin('scaffolt');
var Promise = require('bluebird');

// Iterate over non-module generators for creating tasks that scaffold
task('g', ['generate'])
task('gen', ['generate'])
desc('Scaffold item(s), or list available scaffolds')
task('generate', function() {
  var promises = [];

  // Iterate over all available generators.
  generators.forEach(function(generator) {
    var names = process.env[generator];
    if(names) {
      names.split(',').forEach(function(name) {
        promises.push(new Promise(function() {
          validate(generator, name);
          return scaffolt.execute(generator, name);
        }));
      });
    }
  });

  // Check if promises have been made. If not, list available generators.
  if(promises.length) {
    return Promise.all(promises);
  }
  else {
    return scaffolt.execute('--list');
  }
});

// Iterate over non-module generators for creating tasks that undo a scaffold
task('d', ['destroy'])
task('del', ['destroy'])
desc('Destroy scaffolded item(s), or list available scaffolds')
task('destroy', function() {
  var promises = [];

  // Iterate over all available generators.
  generators.forEach(function(generator) {
    var names = process.env[generator];
    if(names) {
      names.split(',').forEach(function(name) {
        promises.push(new Promise(function() {
          validate(generator, name);
          return scaffolt.execute(generator, name, '--revert');
        }));
      });
    }
  });

  // Check if promises have been made. If not, list available generators.
  if(promises.length) {
    return Promise.all(promises);
  }
  else {
    return scaffolt.execute('--list');
  }
});

function validate(generator, name) {
  // Throw Jake fails here if it does not validate
}
