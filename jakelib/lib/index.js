require('sugar');
var fs = require('fs');
var jsonfile = require('jsonfile');
var path = require('path');
var Promise = require('bluebird');
var spawn = require('child_process').spawn;

var cwd = process.cwd();
var slice = Array.prototype.slice;

/**
 * Wraps spawn command in a promise.
 * @param  {String} command Command to execute in the shell
 * @param  {Object} options Options to pass through via the spawn command
 * @return {Promise}        Bluebird promise that resolves when command is
 *                          completed. Errors or aborts will cause rejection.
 */
exports.execute = function(command, options) {
  var child;

  // Ensure that stdio io is inherited (allows color preservation)
  if(options == null) {
    options = {};
  }
  options.stdio = 'inherit';

  // Parse command to be spawn-friendly
  command = command.compact().split(' ');
  args = command.slice(1);
  command = command[0];

  // Run spawn and leverage promises
  return new Promise(function(resolve, reject) {
    // Catch for Ctrl-C
    process.on('SIGINT', reject);

    // Execute and check for errors when process finishes
    child = spawn(command, args, options);
    child.on('exit', function(code) {
      if(!code) {
        resolve();
      }
      else {
        reject();
      }
    });
    child.on('error', reject);
  })
  .finally(function() {
    if(child) {
      child.kill();
    }
  });
};

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
 * Return the absolute path for the binary of a locally installed node package.
 * @param  {String} moduleName Name of binary installed locally
 * @return {String}            Absolute path
 */
exports.localBinCommand = function(moduleName, args) {
  var command = exports.resolvePath('node_modules', '.bin', moduleName);
  if(args) {
    command += ' ' + args.compact();
  }
  return command;
}

/**
 * Return the absolute path like path.resolve, but use the project directory
 * as the starting point.
 * @return {String} Absolute path
 */
exports.resolvePath = function() {
  return path.resolve.apply(null, [cwd].concat(slice.call(arguments, 0)));
};

/**
 * List of available devices for Cordova.
 * @type {Array}
 */
exports.devices = ['android', 'ios'];
