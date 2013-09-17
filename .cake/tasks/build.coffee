require 'sugar'
wrench = require 'wrench'
Bower = require './bower'
Exec = require '../lib/exec'

module.exports = class Build extends Exec
  command: './node_modules/.bin/brunch'

  for type in ['once', 'watch', 'server']
    this[type] ?= {}
    for environment in ['development', 'production'] then do (type, environment) =>
      this[type][environment] = =>
        instance = new this
        instance.build({platform, type, environment})

  build: ({platform, type, environment}) ->
    args = switch type
      when 'once' then ['build']
      when 'watch' then ['watch']
      when 'server' then ['watch', '-s']

    args.push '-e', environment

    # Before running the brunch command let's clear the public folder
    {config} = require "../../#{args.last()}"
    wrench.rmdirSyncRecursive config.paths.public, ->

    Bower.install =>
      @exec args