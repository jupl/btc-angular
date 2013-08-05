Bower = require './tasks/bower'
Build = require './tasks/build'
Help = require './tasks/help'

module.exports =

  bower:
    install:
      command:      'bower:install'
      description:  'Download and install Bower dependencies\n'
      task:         -> do Bower.install

  build:
    once:
      dev:
        command:      'build:dev'
        description:  'Build project'
        task:         -> do Build.once.web.development
      prod:
        command:      'build:prod'
        description:  'Build project minified'
        task:         -> do Build.once.web.production
    watch:
      dev:
        command:      'watch:dev'
        description:  'Continuously rebuild project on changes'
        task:         -> do Build.watch.web.development
      prod:
        command:      'watch:prod'
        description:  'Continuously rebuild project minified on changes'
        task:         -> do Build.watch.web.production
    server:
      dev:
        command:      'server:dev'
        description:  'Continuously rebuild project on changes, and host locally'
        task:         -> do Build.server.web.development
      prod:
        command:      'server:prod'
        description:  'Continuously rebuild project minified on changes, and host locally\n'
        task:         -> do Build.server.web.production

  help:
    npm:
      command:      'help:npm'
      description:  'Help for those running commands from npm\n'
      task:         -> do Help.npm