{runTest, getExcludeFileTest} = require './util'

jsFiles = [
  'javascripts/vendor.js'
  'test/javascripts/tests.js'
]
cssFiles = [
  'stylesheets/app.css'
]

exports.generate = (platform, buildPath) ->
  # Get base config
  {config} = require '../config'

  # Get reference to CSS and JS joinTos
  jsJoinTo = config.files.javascripts.joinTo
  cssJoinTo = config.files.stylesheets.joinTo

  # Rename build path
  config.paths.public = buildPath

  # Add additional checking to JS files
  for jsFile in jsFiles then do (jsFile) ->
    fileTest = jsJoinTo[jsFile]
    excludeFileTest = getExcludeFileTest platform, jsFile
    jsJoinTo[jsFile] = (file) ->
      return false if excludeFileTest.test file
      runTest fileTest, file

  # Add additional checking to CSS files
  for cssFile in cssFiles then do (cssFile) ->
    fileTest = cssJoinTo[cssFile]
    excludeFileTest = getExcludeFileTest platform, cssFile
    cssJoinTo[cssFile] = (file) ->
      return false if excludeFileTest.test file
      runTest fileTest, file

  # We now have a modified config
  config