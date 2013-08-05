Exec = require '../lib/exec'

module.exports = class Bower extends Exec
  command: './node_modules/.bin/bower'

  @install:  ->
    instance = new this
    instance.install arguments...

  install: (callback) ->
    @exec ['install'], callback