wrench = require 'wrench'
Exec = require '../lib/exec'
Cordova = require './cordova'

module.exports = class Build extends Exec
  command: './node_modules/.bin/brunch'

  for platform in Cordova::platforms.concat('web') then do (platform) =>
    for type in ['once', 'watch', 'server'] then do (type) =>
      type = 'emulate' if type is 'server' and platform isnt 'web'
      platform = 'cordova' if type is 'watch' and platform isnt 'web'
      this[type] ?= {}
      this[type][platform] ?= {}
      for environment in ['development', 'production'] then do (environment) =>
        this[type][platform][environment] = ->
          build = new Build
          build.build({platform, type, environment})

  build: ({platform, type, environment}) ->
    args = switch type
      when 'once', 'emulate' then ['build']
      when 'watch' then ['watch']
      when 'server' then ['watch', '-s']

    args.push '-o' if environment is 'production'

    if platform is 'web'
      args.push '-c', "configs/web/#{environment}"
    else
      args.push '-c', "configs/cordova/#{environment}"

    # Before running the brunch command let's clear the public folder
    {config} = require "../../#{args.slice(-1)[0]}"
    wrench.rmdirSyncRecursive config.paths.public, ->

    @exec args, =>
      @cordova({platform, type}) unless platform is 'web'

  cordova: ({platform, type}) ->
    switch type
      when 'once' then Cordova.build[platform]()
      when 'emulate' then Cordova.emulate[platform]()