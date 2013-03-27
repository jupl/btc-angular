module.exports = class Help
  maxCommandLength: 20

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
      command = taskObject.command
      if @maxCommandLength - command.length > 0
        command += Array(@maxCommandLength - command.length).join ' '
      console.log "#{command} # #{taskObject.description}"
    else
      for key, value of taskObject
        @_printTasks value unless key is 'npm'