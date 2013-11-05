require('sugar');
var fs = require('fs');
var jsonfile = require('jsonfile');
var path = require('path');

module.exports = fs.readdirSync('generators').filter(function(generator) {
  return fs.existsSync(path.resolve('generators', generator, 'generator.json'));
})
.map(function(generator) {
  var json = jsonfile.readFileSync(path.resolve('generators', generator, 'generator.json'));
  return {
    task: generator.dasherize().replace(/-/g, ''),
    name: generator,
    description: json.description || generator.spacify(),
    isModule: !!json.isModule
  }
});
