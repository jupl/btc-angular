require 'sugar'
commander = require 'commander'
Exec = require './exec'

module.exports = class Scaffold extends Exec
  command: './node_modules/.bin/scaffolt'

  @generate: ->
    instance = new this
    instance.generate arguments...

  @destroy: ->
    instance = new this
    instance.destroy arguments...

  generate: (name, callback) ->
    callback = process.exit unless Object.isFunction(callback)
    args = [@constructor.name.dasherize()]
    if name
      args.push name
      return @exec args, callback

    @prompt (name) =>
      args.push name
      @exec args, callback

  destroy: (name, callback) ->
    callback = process.exit unless Object.isFunction(callback)
    args = [@constructor.name.dasherize()]
    if name
      args.push name, '--revert'
      return @exec args, callback

    @prompt (name) =>
      args.push name, '--revert'
      @exec args, callback

  prompt: (callback) ->
    commander.prompt @promptString(), (name) =>
      if @validate name
        callback name.parameterize().dasherize()
      else
        @prompt callback

  promptString: (name) ->
    name ?= @constructor.name.underscore().humanize().toLowerCase()
    "\nEnter name for #{name}: "

  validate: (name) ->
    not name.parameterize().isBlank()
