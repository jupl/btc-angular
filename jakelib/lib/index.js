'use strict';

require('sugar');
var os = require('os');
var path = require('path');
var Promise = require('bluebird');
var spawn = require('child_process').spawn;
var slice = Array.prototype.slice;

/**
 * Return a function that will execute a console command
 * @param  {String} command    Command to execute
 * @return {Object}            Object with two properties:
 *                             execute - Function that runs the node module
 *                             command. Arguments passed to the function will
 *                             be added to the module command. It returns a
 *                             promise.
 *                             options - Options to pass through, since
 *                             execute relies on node's spawn.
 */
exports.bin = function(command) {
  return {
    options: {
      stdio: 'inherit'
    },
    execute: function() {
      var args = slice.call(arguments, 0);
      return execute.apply(null, [command, this.options].concat(args));
    }
  };
}

/**
 * Return a function that will execute the a node module command
 * @param  {String} moduleName Name of node module installed locally
 * @return {Object}            Object with execute command and options object.
 *                             For more information see bin command above.
 */
exports.npmBin = function(moduleName) {
  var command = path.join('node_modules', '.bin', moduleName);

  // Tack on '.cmd' for Windows platform
  if(os.platform() === 'win32') {
    command += '.cmd';
  }

  return exports.bin(command);
}

/**
 * Wraps spawn command in a promise.
 * @param  {String}    command Path to command to execute in the shell
 * @param  {Object}    options Options to pass through via the spawn command
 * @param  {Array}     args    If given argument is an array, it is assumed
 *                             that it is a list of arguments to be passed.
 * @param  {...String}         Params for command that would be space separated
 * @return {Promise}           Bluebird promise that resolves when command is
 *                             completed. Errors or aborts will cause
 *                             rejection.
 */
function execute(command, options, args) {
  var child;

  // Check if arguments have been given as an array
  if(!Object.isArray(args)) {
    args = slice.call(arguments, 2);
  }

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
  .cancellable()
  .finally(function() {
    if(child) {
      child.kill();
    }
  });
};
