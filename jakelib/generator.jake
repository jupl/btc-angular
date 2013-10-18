// Scaffolt generator tasks
require('sugar');
var fs = require('fs');
var jsonfile = require('jsonfile');
var path = require('path');
var Promise = require('bluebird');

// Iterate over generators to get name and description
var generators = fs.readdirSync('generators').filter(function(generator) {
  return fs.existsSync(path.resolve('generators', generator, 'generator.json'));
})
.map(function(generator) {
  return {
    task: generator.dasherize().replace(/-/g, ''),
    name: generator,
    description: jsonfile.readFileSync(path.resolve('generators', generator, 'generator.json')).description
  }
});

// Iterate over generators for creating tasks that scaffold
namespace('gen', function() {
  generators.forEach(function(generator) {
    if(generator.description) {
      desc('Generate a ' + generator.description);
    }
    else {
      desc('Generate a ' + generator.name.spacify());
    }
    task(generator.task, function() {
      return new Promise(function(resolve) {
        jake.Task['scaffold:gen'].addListener('complete', resolve).invoke(generator.name);
      });
    });
  });
});

// Iterate over generators for creating tasks that destroys a scaffold
namespace('del', function() {
  generators.forEach(function(generator) {
    if(generator.description) {
      desc('Destroy a generated ' + generator.description);
    }
    else {
      desc('Destroy a generated ' + generator.name.spacify());
    }
    task(generator.task, function() {
      return new Promise(function(resolve) {
        jake.Task['scaffold:del'].addListener('complete', resolve).invoke(generator.name);
      });
    });
  });
});