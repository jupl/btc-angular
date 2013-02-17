wrench = require 'wrench'
Exec = require '../lib/exec'
Cordova = require './cordova'

wrench = require 'wrench'

module.exports = class Build extends Exec
  command: './node_modules/.bin/brunch'

  onceAndroidDev:  => @_buildCordova('build', 'android')
  onceAndroidProd: => @_buildCordova('build', 'android', prod: yes)
  onceIOSDev:      => @_buildCordova('build', 'ios')
  onceIOSProd:     => @_buildCordova('build', 'ios', prod: yes)
  onceWebDev:      => @_buildWeb('build')
  onceWebProd:     => @_buildWeb('build', prod: yes)
  onceAllDev: =>
    @_buildWeb('build')
    @_buildCordova('build', 'all')
  onceAllProd: =>
    @_buildWeb('build', prod: yes)
    @_buildCordova('build', 'all', prod: yes)

  watchCordovaDev:  => @_buildCordova('watch')
  watchCordovaProd: => @_buildCordova('watch', prod: yes)
  watchWebDev:      => @_buildWeb('watch')
  watchWebProd:     => @_buildWeb('watch', prod: yes)

  serverDev:  => @_buildWeb('watch', server: yes)
  serverProd: => @_buildWeb('watch', server: yes, prod: yes)

  emulateAndroidDev:  => @_buildCordova('emulate', 'android')
  emulateAndroidProd: => @_buildCordova('emulate', 'android', prod: yes)
  emulateIOSDev:      => @_buildCordova('emulate', 'ios')
  emulateIOSProd:     => @_buildCordova('emulate', 'ios', prod: yes)
  emulateAllDev:      => @_buildCordova('emulate', 'all')
  emulateAllProd:     => @_buildCordova('emulate', 'all', prod: yes)

  _buildCordova: (action, platform, {prod, emulate} = {}) =>
    configPath = "configs/cordova-#{if prod then 'prod' else 'dev'}"
    mode = if platform is 'emulate' then 'build' else platform
    {config} = require "../../#{configPath}"
    wrench.rmdirSyncRecursive config.paths.public, ->
    args = [mode, '-c', configPath]
    args.push '-o' if prod
    @exec args, =>
      @_cordova action, platform

  _buildWeb: (mode, {prod, server} = {}) ->
    configPath = "configs/#{if prod then 'prod' else 'dev'}"
    {config} = require "../../#{configPath}"
    wrench.rmdirSyncRecursive config.paths.public, ->
    args = [mode, '-c', configPath]
    args.push '-s' if mode is 'watch' and server
    args.push '-o' if prod
    @exec args

  _cordova: (action, platform) ->
    switch action
      when 'build' then switch platform
        when 'android' then Cordova.buildAndroid()
        when 'ios' then Cordova.buildIOS()
        when 'all' then Cordova.buildAll()
      when 'emulate' then switch platform
        when 'android' then Cordova.emulateAndroid()
        when 'ios' then Cordova.emulateIOS()
        when 'all' then Cordova.emulateAll()