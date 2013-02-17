fs = require 'fs'
wrench = require 'wrench'
commander = require 'commander'
_s = require 'underscore.string'
Exec = require '../lib/exec'

module.exports = class Cordova extends Exec
  command: './node_modules/.bin/cordova'
  cordovaPath: './build/cordova'
  platforms: ['android', 'ios']

  init: =>
    @_initialize()
  initAndroid: =>
    @_initialize()
    @addAndroid()
  initIOS: =>
    @_initialize()
    @addIOS()
  initAll: =>
    @_initialize()
    @addAll()

  addAndroid: => @_add 'android'
  addIOS:     => @_add 'ios'
  addAll:     => @_add @platforms...

  removeAndroid: => @_remove 'android'
  removeIOS:     => @_remove 'ios'
  removeAll:     => @_remove @platforms...

  buildAndroid: => @_build 'android'
  buildIOS:     => @_build 'ios'
  buildAll:     => @_build @platforms...

  emulateAndroid: => @_emulate 'android'
  emulateIOS:     => @_emulate 'ios'
  emulateAll:     => @_emulate @platforms...

  _initialize: ->
    wrench.rmdirSyncRecursive @cordovaPath, ->
    args = ['create', @cordovaPath]

    packageNamePrompt = (callback) =>
      commander.prompt 'Package name (optional): ', (name) =>
        name = _s.clean name
        name = "#{name.charAt(0).toLowerCase}#{name.slice(1)}"
        if name isnt ''
          args.push name
          appNamePrompt callback
        else
          do callback

    appNamePrompt = (callback) =>
      commander.prompt 'App name (optional): ', (name) =>
        name = _s.titleize _s.clean name
        args.push name if name isnt ''
        do callback

    packageNamePrompt =>
      @exec args

  _add: (platforms...) ->
    platforms.unshift 'add'
    onExit = =>
      for platform in platforms
        fs.createReadStream("../gitignore/#{platform}.gitignore")
          .pipe(fs.createWriteStream("#{@cordovaPath}/platforms/#{platform}/.gitignore"))
    @exec(platforms, onExit, cwd: @cordovaPath)

  _remove: (platforms...) ->
    platforms.unshift 'remove'
    @exec(platforms, (->), cwd: @cordovaPath)

  _build: (platforms...) ->
    platforms.unshift 'build'
    @exec(platforms, (->), cwd: @cordovaPath)

  _emulate: (platforms...) ->
    platforms.unshift 'emulate'
    @exec(platforms, (->), cwd: @cordovaPath)