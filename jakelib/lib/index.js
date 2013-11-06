require('sugar');
var fs = require('fs');
var jsonfile = require('jsonfile');
var path = require('path');

/**
 * List of available generators from Scaffolt. Each element has the following
 * properties:
 *   name         Generator name that is to be passed to Scaffolt
 *   task         Same as name, but its name is formatted to be friendly with
 *                Jake task names
 *   description  Description of generator. If one is not defined in Scaffolt,
 *                then make an educated guess with the name.
 *   isModule     If true, then when generating the scaffold the name parameter
 *                is ignored. Otherwise, the name parameter is used for
 *                scaffolding.
 * @type {Array}
 */
exports.generators = fs.readdirSync('generators').filter(function(generator) {
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

/**
 * List of available devices for Cordova.
 * @type {Array}
 */
exports.devices = ['android', 'ios'];
