exports.config =
  paths:
    public: 'build/web'

  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
      order:
        before: []
        after: []

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
      order:
        before: []
        after: []

    templates:
      joinTo: 'javascripts/app.js'