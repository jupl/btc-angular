exports.config =
  paths:
    public: 'build/base'

  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
      order:
        before: ['test/vendor/scripts/modernizr.js']
        after: []

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
      order:
        before: []
        after: []

    templates:
      joinTo: 'javascripts/app.js'