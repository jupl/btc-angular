exports.config =
  paths:
    public: 'build/base'

  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
        'test/javascripts/tests.js': /^test[\\/]tests/
        'test/javascripts/vendor.js': /^test[\\/]vendor/
      order:
        after: ['test/vendor/scripts/test-helper.js']          

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
        'test/stylesheets/test.css': /^test/

    templates:
      joinTo: 'javascripts/app.js'