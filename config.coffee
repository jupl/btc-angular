exports.config =

  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/

    templates:
      joinTo: 'javascripts/app.js'