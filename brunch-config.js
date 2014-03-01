'use strict';

exports.config = {
  paths: {
    public: 'public'
  },

  server: {
    path: 'server',
    port: 3333
  },

  plugins: {
    autoreload: {
      enabled: process.env.browsersync !== 'true'
    }
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
    wrapper: false
  }
};
