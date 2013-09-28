'use strict';

var Q = require('q');
var prompt = require('promptly').prompt;

// Iterate over each task that is declared
var forEachTask = exports.forEachTask = function(callback, command, tasks) {
  if(tasks == null && command == null) {
    tasks = require('..');
  }
  if(typeof tasks !== 'object') {
    return;
  }

  if(tasks.description && tasks.task) {
    callback(command, tasks.description, tasks.task);
  }
  for(var index in tasks) {
    var subCommand = command ? command + ':' : '';
    forEachTask(callback, subCommand + index, tasks[index]);
  }
};

// Wrap promptly's prompt in a promise
exports.prompt = function(message, opts) {
  var deferred = Q.defer();

  prompt(message, opts, function(err, name) {
    if(err) {
      deferred.reject(err);
    }
    else {
      deferred.resolve(name);
    }
  });

  return deferred.promise;
};