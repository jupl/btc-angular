Build = require './tasks/build'
Help = require './tasks/help'

module.exports =

  build:
    once:
      dev:
        command:      'build:dev'
        description:  'Build project'
        task:         -> do Build.once.development
      prod:
        command:      'build:prod'
        description:  'Build project minified'
        task:         -> do Build.once.production
    watch:
      dev:
        command:      'watch:dev'
        description:  'Continuously rebuild project on changes'
        task:         -> do Build.watch.development
      prod:
        command:      'watch:prod'
        description:  'Continuously rebuild project minified on changes'
        task:         -> do Build.watch.production
    server:
      dev:
        command:      'server:dev'
        description:  'Continuously rebuild project on changes, and host locally'
        task:         -> do Build.server.development
      prod:
        command:      'server:prod'
        description:  'Continuously rebuild project minified on changes, and host locally\n'
        task:         -> do Build.server.production

  help:
    npm:
      command:      'help:npm'
      description:  'Help for those running commands from npm'
      task:         -> do Help.npm