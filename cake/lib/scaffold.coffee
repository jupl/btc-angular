scaffolt = require 'scaffolt'
_s = require 'underscore.string'

module.exports = class Scaffold

  @generate: ->
    scaffold = new @constructor
    scaffold.generate arguments...

  @destroy: ->
    scaffold = new @constructor
    scaffold.destroy arguments...

  generate: (name = '', callback = ->) ->
    scaffolt @className(), name, callback

  destroy: (name = '', callback = ->) ->
    scaffolt @className(), name, {revert: yes}, callback

  className: ->
    _s.dasherize(@constructor.name).replace(/^-/, '')