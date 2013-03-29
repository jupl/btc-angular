require 'sugar'
wrench = require 'wrench'
Exec = require '../lib/exec'
Cordova = require './cordova'

module.exports = class Build extends Exec
  command: './node_modules/.bin/brunch'

  for typeTmp in ['once', 'watch', 'server']
    for platformTmp in Cordova::platforms.concat('web')
      type = typeTmp
      platform = platformTmp
      if platform isnt 'web'
        type = 'emulate' if type is 'server'
        platform = 'cordova' if type is 'watch'
      this[type] ?= {}
      this[type][platform] ?= {}
      for environment in ['development', 'production'] then do (type, platform, environment) =>
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
    {config} = require "../../#{args.last()}"
    wrench.rmdirSyncRecursive config.paths.public, ->

    @exec args, =>
      @cordova({platform, type}) unless platform is 'web'

  cordova: ({platform, type}) ->
    switch type
      when 'once' then Cordova.build[platform]()
      when 'emulate' then Cordova.emulate[platform]()
