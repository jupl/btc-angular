scaffolt = require 'scaffolt'
commander = require 'commander'
_s = require 'underscore.string'

module.exports = class Scaffold

  @generate: ->
    scaffold = new this
    scaffold.generate arguments...

  @destroy: ->
    scaffold = new this
    scaffold.destroy arguments...

  generate: (name = '', callback = ->) ->
    if name
      scaffolt @className(), name, callback
      return

    @prompt (name) =>
      scaffolt @className(), name, callback

  destroy: (name = '', callback = ->) ->
    if name
      scaffolt @className(), name, callback
      return

    @prompt (name) =>
      scaffolt @className(), name, {revert: yes}, callback

  className: ->
    _s.dasherize(@constructor.name).replace(/^-/, '')

  prompt: (callback) ->
    commander.prompt @promptString(), (name) =>
      if @validate name
        callback name
      else
        @prompt callback

  promptString: ->
    name = _s.humanize(@constructor.name).toLowerCase()
    "\nEnter name for #{name}: "

  validate: (name) ->
    true