scaffolt = require 'scaffolt'
commander = require 'commander'
_s = require 'underscore.string'

module.exports = class Scaffold

  @generate: ->
    instance = new this
    instance.generate arguments...

  @destroy: ->
    instance = new this
    instance.destroy arguments...

  generate: (name, callback = ->) ->
    if name
      scaffolt @className(), name, {}, callback
      return

    @prompt (name) =>
      scaffolt @className(), name, {}, process.exit

  destroy: (name, callback = ->) ->
    if name
      scaffolt @className(), name, {revert: yes}, callback
      return

    @prompt (name) =>
      scaffolt @className(), name, {revert: yes}, process.exit

  className: ->
    _s.dasherize(@constructor.name).replace(/^-/, '')

  prompt: (callback) ->
    commander.prompt @promptString(), (name) =>
      if @validate name
        callback name
      else
        @prompt callback

  promptString: ->
    name = _s.humanize(@className()).toLowerCase()
    "\nEnter name for #{name}: "

  validate: (name) ->
    true