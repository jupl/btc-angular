'use strict';

var Q = require('q');
var spawn = require('child_process').spawn;
var execute = module.exports = Object.create(null);

execute.execute = function(args, options) {
  var deferred = Q.defer();
  var child = spawn(this.command, args, options);
  child.on('exit close', function() {
    deferred.resolve.apply(deferred, arguments);
  });
  child.on('error disconnnect', function(err) {
    deferred.reject.apply(deferred, arguments);
  });
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  return deferred.promise;
};