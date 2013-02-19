{addIgnored} = require './build-util'

module.exports = (mode, config) ->
  switch mode
    when 'dev' then setDevMode config
    when 'prod' then setProdMode config

# For dev, include test files
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

# For prod, ignore any test assets
setProdMode = (config) ->
  addIgnored config, /^test/
  config