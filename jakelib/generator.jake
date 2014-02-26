'use strict';

// Scaffolt generator tasks
var fs = require('fs');
var generators = require('./lib').generators;
var path = require('path');
var scaffolt = require('./lib').npmBin('scaffolt');
var Promise = require('bluebird');
var generate = true;

// Aliases for generator tasks
task('g', ['generate']);
task('gen', ['generate']);
task('d', ['destroy']);
task('del', ['destroy']);

// Iterate over non-module generators for creating tasks that scaffold
desc('Scaffold item(s), or list available scaffolds');
task('generate', function() {
  var promises = [];

  // Iterate over all available generators.
  getGenerators().forEach(function(generator) {
    var names = process.env[generator];
    if(names) {
      names.split(',').forEach(function(name) {
        promises.push(new Promise(function() {
          validate(generator, name);
          if(generate) {
            return scaffolt.execute(generator, name);
          }
          else {
            return scaffolt.execute(generator, name, '--revert');
          }
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
desc('Destroy scaffolded item(s), or list available scaffolds');
task('destroy', function() {
  generate = false;
  return jake.Task['generate'].execute();
});

function validate(generator, name) {
  // Throw Jake fails here if it does not validate
}

function getGenerators() {
  return fs.readdirSync('generators').filter(function(generator) {
    return fs.existsSync(path.join('generators', generator, 'generator.json'));
  });
}
