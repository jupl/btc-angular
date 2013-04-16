Scaffold = require './scaffold'

module.exports = class Module extends Scaffold

  @add: ->
    instance = new this
    instance.generate 'placeholder', arguments...

  @remove: ->
    instance = new this
    instance.destroy 'placeholder', arguments...