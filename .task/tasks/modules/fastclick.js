'use strict';

var bower = require('../bower');
var fastclick = module.exports = Object.create(null);

fastclick.version = '~0.6.10';

fastclick.add = function() {
  var self = this;

  bower.edit(function(json) {
    json.dependencies.fastclick = self.version;
  });
};

fastclick.remove = function() {
  bower.edit(function(json) {
    delete json.dependencies.fastclick;
  });
};