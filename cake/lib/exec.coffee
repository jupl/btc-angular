{spawn} = require 'child_process'

module.exports = class Exec

  exec: (args = [], onExit = ->) ->
    child = spawn @command, args
    child.on 'exit', onExit
    child.stdout.pipe process.stdout
    child.stderr.pipe process.stderr