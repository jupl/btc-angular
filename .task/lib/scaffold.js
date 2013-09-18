'use strict';

require('sugar');
var Q = require('q');
var prompt = require('promptly').prompt;
var execute = require('./execute');
var scaffold = module.exports = Object.create(execute);

scaffold.command = './node_modules/.bin/scaffolt';

scaffold.generate = function(name, destroy) {
  var self = this;

  if(name) {
    return execute(name);
  }
  else {
    return this.prompt().done(execute);
  }

  function execute(name) {
    var args = [self.name, name];
    if(destroy) {
      args.push('--revert');
    }
    return self.execute(args);
  }
};

scaffold.destroy = function(name) {
  this.generate.call(this, name, true);
};

scaffold.prompt = function() {
  var self = this;
  var deferred = Q.defer();
  prompt(this.promptString(), {validator: this.validate.bind(this)}, function(err, name) {
    if(err) {
      deferred.reject(err);
    }
    else {
      deferred.resolve(name.parameterize().dasherize());
    }
  });
  return deferred.promise;
};

scaffold.promptString = function(name) {
  if(name == null) {
    name = this.name.underscore().humanize().toLowerCase();
  }
  return '\nEnter name for ' + name + ': ';
};

scaffold.validate = function(name) {
  return !name.parameterize().isBlank();
};