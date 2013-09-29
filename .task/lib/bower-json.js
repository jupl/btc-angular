'use strict';

var jsonfile = require('jsonfile');
var bowerJson = module.exports = Object.create(null);
var filename = '../../bower.json';

bowerJson.open = function() {
  this.json = jsonfile.readFileSync(filename);
};

bowerJson.close = function() {
  if(this.json) {
    jsonfile.writeFileSync(filename, this.json);
    delete this.json;
  }
};