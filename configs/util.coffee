typeof$ = (obj) -> ({}).toString.call(obj).slice(8, -1)

module.exports =

  runTest: (test, file) ->
    switch typeof$ test
      when 'RegExp' then test.test file
      when 'Function' then test file
      when 'String' then test is file

  getExcludeFileTest: (platform, file) ->
    switch file
      when 'javascripts/vendor.js'
        new RegExp("^vendor(\\/|\\\\)vendor(?!-#{platform})")
      when 'test/javascripts/tests.js'
        new RegExp("^test(\\/|\\\\)tests(\\/|\\\\)tests(?!-#{platform})")
      when 'stylesheets/app.css'
        new RegExp("^vendor(\\/|\\\\)vendor(?!-#{platform})")