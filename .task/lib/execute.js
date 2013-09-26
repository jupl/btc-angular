'use strict';

var Q = require('q');
var spawn = require('child_process').spawn;
var execute = module.exports = Object.create(null);

execute.execute = function(args, options) {
  // Ensure that stdio io is inherited (allows color preservation)
  if(options == null) {
    options = {};
  }
  options.stdio = 'inherit';

  // Run spawn and use Q for promises
  var deferred = Q.defer();
  var child = spawn(this.command, args, options);
  child.on('exit', function() {
    deferred.resolve.apply(deferred, arguments);
  });
  child.on('error', function(err) {
    deferred.reject.apply(deferred, arguments);
  });
  return deferred.promise;
};