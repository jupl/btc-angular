// Scaffolt generator tasks
require('sugar');
var fs = require('fs');
var jsonfile = require('jsonfile');
var path = require('path');

// Iterate over generators to get name and description
var generators = fs.readdirSync('generators').filter(function(generator) {
  return fs.existsSync(path.resolve('generators', generator, 'generator.json'));
})
.map(function(generator) {
  return {
    task: generator.dasherize().replace(/-/g, ':'),
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
      desc('');
    }
    task(generator.task, function() {
      jake.Task['scaffold:gen'].invoke(generator.name);
    })
  });
});

// Iterate over generators for creating tasks that destroys a scaffold
namespace('del', function() {
  generators.forEach(function(generator) {
    if(generator.description) {
      desc('Destroy a generated ' + generator.description);
    }
    else {
      desc('');
    }
    task(generator.task, function() {
      jake.Task['scaffold:del'].invoke(generator.name);
    })
  });
});