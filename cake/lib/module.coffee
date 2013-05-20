Scaffold = require './scaffold'

module.exports = class Module extends Scaffold

  @add: ->
    @generate 'placeholder', arguments...

  @remove: ->
    @destroy 'placeholder', arguments...