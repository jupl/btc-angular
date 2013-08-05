{addIgnored} = require './build-util'

module.exports = (environment, config) =>
  switch environment
    when 'web' then webEnvironment config
    else config

webEnvironment = (config) ->
  config.paths ?= {}
  config.paths.public = 'build/web'
  config