exports.config =
  paths:
    public: 'build/base'

  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor(\/|\\)(?!vendor-)/
        'test/javascripts/tests.js': /^test(\/|\\)tests(\/|\\)(?!tests-)/
        'test/javascripts/vendor.js': /^test(\/|\\)vendor/
      order:
        before: []

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor(\/|\\)(?!vendor-))/
        'test/stylesheets/test.css': /^test/
      order:
        before: []
        after: []

    templates:
      joinTo: 'javascripts/app.js'