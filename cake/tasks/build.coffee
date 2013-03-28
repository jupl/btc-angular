wrench = require 'wrench'
Exec = require '../lib/exec'

module.exports = class Build extends Exec
  command: './node_modules/.bin/brunch'

  for platform in ['web'] then do (platform) =>
    for type in ['once', 'watch', 'server'] then do (type) =>
      for environment in ['development', 'production'] then do (environment) =>
        this[platform] ?= {}
        this[platform][type] ?= {}
        this[platform][type][environment] = ->
          build = new Build
          build.build({platform, type, environment})

  build: ({platform, type, environment}) ->
    args = switch type
      when 'once' then ['build']
      when 'watch' then ['watch']
      when 'server' then ['watch', '-s']

    args.push '-o' if environment is 'production'
    args.push '-c', "configs/#{platform}/#{environment}"

    # Before running the brunch command let's clear the public folder
    {config} = require "../../#{args.slice(-1)[0]}"
    wrench.rmdirSyncRecursive config.paths.public, ->

    @exec args