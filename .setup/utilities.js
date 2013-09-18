'use strict';

var basename = require('path').basename;

// Add a number of tests to the ignored. Tests can be any of the following:
//   Function: Return true to ignore
//   RegExp:   Match to ignore
//   String:   Equal to ignore
exports.addIgnored = function(config) {
  if(!config.conventions) {
    config.conventions = {};
  }
  var ignored = config.conventions.ignored;
  var tests = Array.prototype.slice.call(arguments, 1);

  config.conventions.ignored = function(file) {
    for(var index = 0, test = tests[index]; index < tests.length; index++) {
      if(test === file) {
        return true;
      }
      if((typeOf(test) === 'Function') && test(file)) {
        return true;
      }
      if((typeOf(test) === 'RegExp') && test.test(file)) {
        return true;
      }
    }

    if(typeOf(ignored) === 'Function') {
      return ignored(file);
    }
    if(typeOf(ignored) === 'RegExp') {
      return ignored.test(file);
    }
    return basename(file).startsWith('_');
  };
}

// Replacement for typeof keyword for slightly more detailed information
var typeOf = exports.typeOf = function(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

// Deep clone an object (usually for the Brunch configuration object)
var clone = exports.clone = function(original) {
  switch(typeOf(original)) {
    case 'Object':
      var object = {};
      for(var key in original) {
        if(original.hasOwnProperty(key)) {
          object[key] = clone(original[key]);
        }
      }
      return object;

    case 'Array':
      return original.map(function(value) {
        return clone(value);
      });

    case 'RegExp':
      return new RegExp(original);

    case 'Date':
      return new Date(original.getTime());

    case 'Function':
      return function() {
        return original.apply(null, arguments);
      };
  }

  return original;
};