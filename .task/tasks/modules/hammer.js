'use strict';

var bower = require('../bower');
var hammer = module.exports = Object.create(null);

hammer.version = '~1.0.5';

hammer.add = function(jquery) {
  var self = this;

  bower.edit(function(json) {
    json.dependencies.hammerjs = self.version;
    if(jquery) {
      delete json.overrides.hammerjs;
    }
    else {
      json.overrides.hammerjs = {
        main: 'dist/hammer.js'
      };
    }
  });
};

hammer.jquery = {
  add: function() {
    return hammer.add(true);
  }
};

hammer.remove = function() {
  bower.edit(function(json) {
    delete json.dependencies.hammerjs;
    delete json.overrides.hammerjs;
  });
};