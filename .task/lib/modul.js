'use strict';

var scaffold = require('./scaffold');
var modul = module.exports = Object.create(scaffold);

modul.add = function() {
  this.generate('placeholder');
};

modul.remove = function() {
  this.destroy('placeholder');
};