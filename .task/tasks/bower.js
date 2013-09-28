'use strict';

var execute = require('../lib/execute');
var bower = module.exports = Object.create(execute);

bower.command = './node_modules/.bin/bower';

// Just call the execte command and return its promise
bower.install = function() {
  return this.execute(['install']);
};