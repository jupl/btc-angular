{runTest, getExcludeFileTest} = require './build-util'

jsFiles = [
  'javascripts/vendor.js'
  'test/javascripts/tests.js'
]
cssFiles = [
  'stylesheets/app.css'
]

module.exports = (env, config) ->
  buildPath = switch env
    when 'android' then 'build/android/assets/www'
    when 'ios' then 'build/ios/www'
    when 'web' then 'build/web'
  generate config, env, buildPath if buildPath?

generate = (config, platform, buildPath) ->
  # Get reference to CSS and JS joinTos
  jsJoinTo = config.files.javascripts.joinTo
  cssJoinTo = config.files.stylesheets.joinTo

  # Rename build path
  config.paths.public = buildPath

  # Add additional checking to JS files
  for jsFile in jsFiles then do (jsFile) ->
    fileTest = jsJoinTo[jsFile]
    return unless fileTest?
    excludeFileTest = getExcludeFileTest platform, jsFile
    jsJoinTo[jsFile] = (file) ->
      return false if excludeFileTest.test file
      runTest fileTest, file

  # Add additional checking to CSS files
  for cssFile in cssFiles then do (cssFile) ->
    fileTest = cssJoinTo[cssFile]
    return unless fileTest?
    excludeFileTest = getExcludeFileTest platform, cssFile
    cssJoinTo[cssFile] = (file) ->
      return false if excludeFileTest.test file
      runTest fileTest, file

  # We now have a modified config
  config