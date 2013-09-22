'use strict';

require('sugar');
var help = module.exports = Object.create(null);

help.maxCommandLength = 24;

help.npm = function() {
  var tasks = require('..');
  
  console.log([
    'There are two ways to run tasks. You can use the cake command if you have CoffeeScript installed. (see http://coffeescript.org/) You can also use npm to execute commands:',
    '',
    '  npm run-script [command]',
    '',
    'Generator commands (gen:) will require a prompt. Command list:',
    ''
  ].join('\n'));
  this.printTasks(tasks);
};

help.printTasks = function(tasks) {
  if(typeof tasks !== 'object') {
    return;
  }

  if(tasks.command && tasks.description && tasks.task) {
    var command = tasks.command
    .padRight(this.maxCommandLength, ' ')
    .truncate(this.maxCommandLength, true, 'right', '');
    console.log(command + ' # ' + tasks.description);
  }
  else {
    for(var key in tasks) {
      if(key !== 'npm') {
        this.printTasks(tasks[key]);
      }
    }
  }
};