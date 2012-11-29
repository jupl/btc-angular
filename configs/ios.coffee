{runTest} = require './util'
{config} = require '../config'

# Rename build path
config.paths.public = 'build/ios/www'

# Additional checking in vendor.js and tests.js
{joinTo} = config.files.javascripts

vendorJsFile = 'javascripts/vendor.js'
vendorJsFileTest = joinTo[vendorJsFile]
joinTo[vendorJsFile] = (file) ->
  return true if /^vendor(\/|\\)vendor-ios/.test file
  runTest vendorJsFileTest, file

testsJsFile = 'test/javascripts/tests.js'
testsJsFileTest = joinTo[testsJsFile]
joinTo[testsJsFile] = (file) ->
  return true if /^test(\/|\\)tests(\/|\\)tests-ios/.test file
  runTest testsJsFileTest, file

# Additional checkng in app.css
{joinTo} = config.files.stylesheets
appCssFile = 'stylesheets/app.css'
appCssFileTest = joinTo[appCssFile]
joinTo[appCssFile] = (file) ->
  return true if /^vendor(\/|\\)vendor-ios/.test file
  runTest appCssFileTest, file

exports.config = config