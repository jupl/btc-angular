{runTest} = require './util'
{config} = require '../config'

# Rename build path
config.paths.public = 'build/android/assets/www'

# Additional checking in vendor.js and tests.js
{joinTo} = config.files.javascripts

vendorJsFile = 'javascripts/vendor.js'
vendorJsFileTest = joinTo[vendorJsFile]
joinTo[vendorJsFile] = (file) ->
  return false if /^vendor(\/|\\)vendor(?!-android)/.test file
  runTest vendorJsFileTest, file

testsJsFile = 'test/javascripts/tests.js'
testsJsFileTest = joinTo[testsJsFile]
joinTo[testsJsFile] = (file) ->
  return false if /^test(\/|\\)tests(\/|\\)tests(?!-android)/.test file
  runTest testsJsFileTest, file

# Additional checkng in app.css
{joinTo} = config.files.stylesheets
appCssFile = 'stylesheets/app.css'
appCssFileTest = joinTo[appCssFile]
joinTo[appCssFile] = (file) ->
  return false if /^vendor(\/|\\)vendor(?!-android)/.test file
  runTest appCssFileTest, file

exports.config = config