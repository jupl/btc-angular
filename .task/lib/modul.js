'use strict';

var scaffold = require('./scaffold');
var modul = module.exports = Object.create(scaffold);

// Use scaffold.generate, but in this case we don't care about the name
modul.add = function() {
  this.generate('placeholder');
};

// Use scaffold.destroy, but in this case we don't care about the name
modul.remove = function() {
  this.destroy('placeholder');
};