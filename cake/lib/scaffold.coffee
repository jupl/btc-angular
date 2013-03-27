scaffolt = require 'scaffolt'
_s = require 'underscore.string'

module.exports = class Scaffold

  generate: (name = '', callback = ->) ->
    scaffolt @className(), name, callback

  revert: (name = '', callback = ->) ->
    scaffolt @className(), name, {revert: yes}, callback

  className: ->
    _s.dasherize(@constructor.name).replace(/^-/, '')