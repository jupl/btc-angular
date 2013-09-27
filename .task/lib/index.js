'use strict';

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