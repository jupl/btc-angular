'use strict';

exports.config = {
  paths: {
    public: 'public'
  },

  server: {
    path: 'server',
    port: 3333
  },

  files: {
    javascripts: {
      joinTo: {
        'scripts/app.js': /^app/,
        'scripts/vendor.js': /^(vendor|bower_components)/
      },
      order: {
        before: ['app/initialize.js']
      }
    },

    stylesheets: {
      joinTo: {
        'styles/app.css': /^(app|vendor|bower_components)/
      }
    },

    templates: {
      joinTo: 'scripts/app.js'
    }
  },

  modules: {
    definition: false,
    wrapper: function(path, code) {
      if(/^app\//.test(path)) {
        code = '\n(function() {\n' + code + '\n})();';
      }
      return code;
    }
  }
};
