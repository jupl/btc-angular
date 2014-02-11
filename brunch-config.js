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
        'javascripts/app.js': /^app/,
        'javascripts/vendor.js': /^(vendor|bower_components)(?!.+angular-mocks.js$)/
      },
      order: {
        before: ['app/config.js']
      }
    },

    stylesheets: {
      joinTo: {
        'stylesheets/app.css': /^(app|vendor|bower_components)/
      }
    },

    templates: {
      joinTo: 'javascripts/app.js'
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
