require 'sugar'
fs = require 'fs'
wrench = require 'wrench'
commander = require 'commander'
Exec = require '../lib/exec'

platforms = ['android', 'ios']

module.exports = class Cordova extends Exec
  command: './node_modules/.bin/cordova'
  cordovaPath: 'build/cordova'
  platforms: platforms

  @initialize: ->
    instance = new this
    instance.initialize arguments...

  for platform in platforms
    for action in ['add', 'remove', 'build', 'emulate'] then do (platform, action) =>
      this[action] ?= {}
      this[action][platform] = =>
        instance = new this
        instance[action]({platform})

  # For initialize, get user input, build Cordova project, and copy generated assets
  initialize: ->
    wrench.rmdirSyncRecursive @cordovaPath, ->
    args = ['create', @cordovaPath]

    packageNamePrompt = (callback) =>
      commander.prompt 'Package name (optional): ', (name) =>
        name = name.parameterize().dasherize().replace(/-/g, '.')
        if name isnt '' and name.has('.')
          args.push name
          appNamePrompt callback
        else
          callback()

    appNamePrompt = (callback) =>
      commander.prompt 'App name (optional): ', (name) =>
        name = name.titleize()
        args.push name if name isnt ''
        callback()

    # After prompt and generation, copy config.xml and res into app/assets
    #   before finishing up.
    packageNamePrompt =>
      @exec args, =>
        stream = fs.createReadStream("#{@cordovaPath}/www/config.xml")
        stream.on 'end', =>
          wrench.copyDirSyncRecursive("#{@cordovaPath}/www/res", 'app/assets/res', ->)
          process.exit()
        stream.pipe(fs.createWriteStream('app/assets/config.xml'))

  # NOTE: For the commands below it is required to be in the Cordova project folder.
  #   Therefore we need to point the command to that folder and change the location
  #   of the command to execute.

  # After adding, drop in .gitignore files to the projects
  add: ({platform}) ->
    onExit = =>
      stream = fs.createReadStream("./cake/gitignore/#{platform}.gitignore")
      stream.on 'end', -> process.exit()
      stream.pipe fs.createWriteStream("#{@cordovaPath}/platforms/#{platform}/.gitignore")
    {command} = this
    @command = "../.#{@command}"
    @exec(['platform', 'add', platform], onExit, cwd: @cordovaPath, env: process.env)
    @command = command

  remove: ({platform}) ->
    {command} = this
    @command = "../.#{@command}"
    @exec(['platform', 'remove', platform], (->), cwd: @cordovaPath)
    @command = command

  build: ({platform}) ->
    {command} = this
    @command = "../.#{@command}"
    @exec(['build', platform], (->), cwd: @cordovaPath)
    @command = command

  emulate: ({platform}) ->
    afterBuild = =>
      @exec(['emulate', platform], (->), cwd: @cordovaPath)
      @command = command

    {command} = this
    @command = "../.#{@command}"
    @exec(['build', platform], afterBuild, cwd: @cordovaPath)