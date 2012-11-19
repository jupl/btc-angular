Exec = require '../lib/exec'

module.exports = class Test extends Exec
  command: './node_modules/.bin/brunch'

  terminal: (callback) =>
    args = ['test', '-c', 'config/web']
    @exec args, (exitCode) ->
      successful = exitCode is 0
      callback? successful