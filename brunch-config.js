var setup = require('./setup');

exports.config = setup({
  modules: {
    definition: false,
    wrapper: false
  },

  angularTemplate: {
    pathToSrc: function(path) {
      return /^app\/(.+)\/template$/.exec(path)[1]
    }
  },

  files: {
    javascripts: {
      joinTo: {
        'javascripts/app.js': /^app/,
        'javascripts/vendor.js': /^(vendor|bower_components)/
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
  }
});
