{spawn} = require 'child_process'

module.exports = class Exec

  exec: (args = [], onExit = (->), options) ->
    child = spawn @command, args, options
    child.on 'exit', onExit
    child.stdout.pipe process.stdout
    child.stderr.pipe process.stderr