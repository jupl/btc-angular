Scaffold = require './scaffold'

module.exports = class Module extends Scaffold

  @add: ->
    instance = new this
    instance.generate 'placeholder'

  @remove: ->
    instance = new this
    instance.destroy 'placeholder'