'use strict';

var execute = require('../lib/execute');
var bower = module.exports = Object.create(execute);

bower.command = './node_modules/.bin/bower';

bower.install = function() {
  return this.execute(['install']);
};