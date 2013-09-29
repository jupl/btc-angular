'use strict';

require('sugar');
var forEachTask = require('../lib').forEachTask;
var help = module.exports = Object.create(null);

help.npm = function() {
  var tasks = require('..');
  var maxCommandLength = 24;
  
  console.log([
    'There are two ways to run tasks. You can use the cake command if you have CoffeeScript installed. (see http://coffeescript.org/) You can also use npm to execute commands:',
    '',
    '  npm run-script [command]',
    '',
    'Generator commands (gen:) will require a prompt. Command list:',
    ''
  ].join('\n'));

  forEachTask(function(command, description) {
    if(command.indexOf('npm') != -1) {
      return;
    }

    command = command
    .padRight(maxCommandLength, ' ')
    .truncate(maxCommandLength, true, 'right', '');
    console.log(command + ' # ' + description);
  });
};