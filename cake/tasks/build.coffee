wrench = require 'wrench'
Exec = require '../lib/exec'

module.exports = class Build extends Exec
  command: './node_modules/.bin/brunch'

  for type in ['once', 'watch', 'server'] then do (type) =>
    for environment in ['development', 'production'] then do (environment) =>
      this[type] ?= {}
      this[type][environment] = ->
        build = new Build
        build.build({type, environment})

  build: ({type, environment}) ->
    args = switch type
      when 'once' then ['build']
      when 'watch' then ['watch']
      when 'server' then ['watch', '-s']

    args.push '-o' if environment is 'production'

    if environment is 'production'
      args.push '-c', 'configs/production'
    else if environment is 'development'
      args.push '-c', 'configs/development'

    # Before running the brunch command let's clear the public folder
    {config} = require "../../#{args.slice(-1)[0]}"
    wrench.rmdirSyncRecursive config.paths.public, ->

    @exec args