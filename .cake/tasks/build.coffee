require 'sugar'
wrench = require 'wrench'
Bower = require './bower'
Exec = require '../lib/exec'
{platforms} = require '../../.configs/platform'
{environments} = require '../../.configs/environment'

module.exports = class Build extends Exec
  command: './node_modules/.bin/brunch'

  for type in ['once', 'watch', 'server']
    this[type] ?= {}
    for platform in platforms
      this[type][platform] ?= {}
      for environment in environments then do (type, platform, environment) =>
        this[type][platform][environment] = =>
          instance = new this
          instance.build({type, platform, environment})

  build: ({type, platform, environment}) ->
    args = switch type
      when 'once' then ['build']
      when 'watch' then ['watch']
      when 'server' then ['watch', '-s']

    args.push '-e', "#{platform}:#{environment}"

    # Before running the brunch command let's clear the public folder
    config = require('../../config').config.overrides["#{platform}:#{environment}"]
    wrench.rmdirSyncRecursive config.paths.public, ->

    Bower.install =>
      @exec args