{addIgnored} = require './build-util'

module.exports = (environment, config) =>
  switch environment
    when 'web' then webEnvironment config
    when 'cordova' then cordovaEnvironment config
    else config

# For web, ignore cordova specific files and set path
webEnvironment = (config) ->
  config.paths ?= {}
  config.paths.public = 'build/web'
  addIgnored config, /^app[\\/]assets[\\/]res/, 'app/assets/config.xml'
  config

# For Cordova, set path
cordovaEnvironment = (config) ->
  config.paths ?= {}
  config.paths.public = 'build/cordova/www'
  config