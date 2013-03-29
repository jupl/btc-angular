require 'sugar'
scaffolt = require 'scaffolt'
commander = require 'commander'

module.exports = class Scaffold

  @generate: ->
    instance = new this
    instance.generate arguments...

  @destroy: ->
    instance = new this
    instance.destroy arguments...

  generate: (name, callback = ->) ->
    if name
      scaffolt @constructor.name.dasherize(), name, {}, callback
      return

    @prompt (name) =>
      scaffolt @constructor.name.dasherize(), name, {}, process.exit

  destroy: (name, callback = ->) ->
    if name
      scaffolt @constructor.name.dasherize(), name, {revert: yes}, callback
      return

    @prompt (name) =>
      scaffolt @constructor.name.dasherize(), name, {revert: yes}, process.exit

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
