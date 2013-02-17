{basename} = require 'path'
typeof$ = (obj) -> ({}).toString.call(obj).slice(8, -1)

module.exports = (mode, config) ->
  switch mode
    when 'dev' then setDevMode config
    when 'prod' then setProdMode config

# Modify given config so that test files are included
setDevMode = (config) ->
  # Get reference to CSS and JS joinTos
  jsJoinTo = config.files.javascripts.joinTo
  cssJoinTo = config.files.stylesheets.joinTo

  # Add test javascript files
  jsJoinTo['test/javascripts/tests.js'] = /^test[\\/]tests/
  jsJoinTo['test/javascripts/vendor.js'] = /^test[\\/]vendor/
  config.files.javascripts.order.after.push 'test/vendor/scripts/test-helper.js'

  # Add test css files
  cssJoinTo['test/stylesheets/test.css'] = /^test/

  config

# Modify given config so that test files are ignored
setProdMode = (config) ->
  config.conventions ?= {}
  {ignored} = config.conventions
  config.conventions.ignored = (file) ->
    return true if /^test/.test(file)
    switch typeof$ ignored
      when 'Function' then ignored file
      when 'RegExp' then ignored.test file
      else basename(file).indexOf('_') is 0
  config