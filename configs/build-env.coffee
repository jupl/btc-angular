{addIgnored} = require './build-util'

module.exports = (env, config) =>
  switch env
    when 'web' then setWebEnv config
    when 'cordova' then setCordovaEnv config
    else config

# For web, ignore cordova specific files and set path
setWebEnv = (config) ->
  config.paths ?= {}
  config.paths.public = 'build/web'
  addIgnored config, /^app[\\/]assets[\\/]res/, 'app/assets/config.xml'
  config

# For Cordova, set path
setCordovaEnv = (config) ->
  config.paths ?= {}
  config.paths.public = 'build/cordova/www'
  config