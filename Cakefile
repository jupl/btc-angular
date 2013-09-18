tasks = require './.task'

buildTasks = (tasks) ->
  return unless typeof tasks is 'object'
  if tasks.command and tasks.description and tasks.task
    task(tasks.command, tasks.description, -> do tasks.task)
  else
    buildTasks(tasks[key]) for key of tasks
  return

buildTasks(tasks)