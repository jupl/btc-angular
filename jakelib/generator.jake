'use strict';

// Scaffolt generator tasks
var generators = require('./lib').generators;
var Promise = require('bluebird');

// Iterate over non-module generators for creating tasks that scaffold
task('g', ['generate'])
task('gen', ['generate'])
desc('Scaffold item(s), or list available scaffolds')
task('generate', function() {
  var promises = [];

  // Iterate over all available generators.
  generators.forEach(function(generator) {
    var type = generator.name;
    var names = process.env[type];
    if(!generator.isModule && names) {
      names.split(',').forEach(function(name) {
        promises.push(new Promise(function(resolve) {
          validate(type, name);
          jake.Task['scaffold:gen']
          .addListener('complete', resolve)
          .invoke(type, name);
        }));
      });
    }
  });

  // Check if promises have been made. If not, list available generators.
  if(promises.length) {
    return Promise.all(promises);
  }
  else {
    listGenerators();
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
    var type = generator.name;
    var names = process.env[type];
    if(!generator.isModule && names) {
      names.split(',').forEach(function(name) {
        promises.push(new Promise(function(resolve) {
          validate(type, name);
          jake.Task['scaffold:del']
          .addListener('complete', resolve)
          .invoke(type, name);
        }));
      });
    }
  });

  // Check if promises have been made. If not, list available generators.
  if(promises.length) {
    return Promise.all(promises);
  }
  else {
    listGenerators();
  }
});

function listGenerators() {
  console.log('Available scaffolds:');
  generators.forEach(function(generator) {
    console.log(generator.name + ' - ' + generator.description.humanize());
  });
}

function validate(generator, name) {
  // Throw Jake fails here if it does not validate
}
