exports.config =
  paths:
    public: 'build/base'

  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app(\/|\\)/
        'javascripts/vendor.js': /^vendor(\/|\\)/
        'test/javascripts/tests.js': /^test(\/|\\)tests(\/|\\)/
        'test/javascripts/vendor.js': /^test(\/|\\)vendor(\/|\\)/
      order:
        before: []

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor)(\/|\\)/
        'test/stylesheets/test.css': /^test(\/|\\)/
      order:
        before: []
        after: []

    templates:
      joinTo: 'javascripts/app.js'