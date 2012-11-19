exports.config =
  paths:
    public: 'build/base'

  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor(\/|\\)base/
        'test/javascripts/tests.js': /^test(\/|\\)tests(\/|\\)base/
        'test/javascripts/vendor.js': /^test(\/|\\)vendor/
      order:
        before: []

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor(\/|\\)base)/
        'test/stylesheets/test.css': /^test/
      order:
        before: []
        after: []

    templates:
      joinTo: 'javascripts/app.js'