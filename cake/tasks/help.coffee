require 'sugar'

module.exports = class Help
  maxCommandLength: 24

  @npm: ->
    help = new Help
    help.npm()

  npm: ->
    tasks = require '../tasks'
    
    console.log """
    
    There are two ways to run tasks. You can use the cake command if you have CoffeeScript installed. (see http://coffeescript.org/) You can also use npm to execute commands:

      npm run-script [command]

    Generator commands (gen:) will require a prompt. Command list:

    """
    @printTasks tasks

  printTasks: (taskObject) ->
    return unless typeof taskObject is 'object'
    if taskObject.command? and taskObject.description? and taskObject.task?
      command = taskObject
        .command
        .padRight(' ', @maxCommandLength)
        .truncate(@maxCommandLength, true, 'right', '')
      console.log "#{command} # #{taskObject.description}"
    else
      @printTasks(value) for key, value of taskObject when key isnt 'npm'