var setup = require('./setup');

exports.config = setup({
  files: {
    javascripts: {
      joinTo: {
        'javascripts/app.js': /^app/,
        'javascripts/vendor.js': /^(vendor|bower_components[\\\/](?!chai|mocha|sinon))/
      }
    },

    stylesheets: {
      joinTo: {
        'stylesheets/app.css': /^(app|vendor|bower_components[\\\/](?!chai|mocha|sinon))/
      }
    },

    templates: {
      joinTo: 'javascripts/app.js'
    }
  }
});
