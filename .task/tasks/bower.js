'use strict';

var path = require('path');
var jsonfile = require('jsonfile');
var execute = require('../lib/execute');
var jsonFile = path.resolve(__dirname, '../../bower.json');
var bower = module.exports = Object.create(execute);

bower.command = './node_modules/.bin/bower';

// Just call the execte command and return its promise
bower.install = function() {
  return this.execute(['install']);
};

// Allows one to read/edit the bower.json file via a callback.
bower.edit = function(callback) {
  var json = jsonfile.readFileSync(jsonFile);
  callback(json);
  jsonfile.writeFileSync(jsonFile, json);
};