var bower = require('./tasks/bower');
var build = require('./tasks/build');
var help = require('./tasks/help');

module.exports = {

  bower: {
    install: {
      command:      'bower:install',
      description:  'Download and install Bower dependencies\n',
      task:         bower.install.bind(bower)
    }
  },

  build: {
    once: {
      dev: {
        command:      'build:dev',
        description:  'Build project',
        task:         build.once.web.dev
      },
      prod: {
        command:      'build:prod',
        description:  'Build project minified',
        task:         build.once.web.prod
      }
    },
    watch: {
      dev: {
        command:      'watch:dev',
        description:  'Continuously rebuild project on changes',
        task:         build.watch.web.dev
      },
      prod: {
        command:      'watch:prod',
        description:  'Continuously rebuild project minified on changes',
        task:         build.watch.web.prod
      }
    },
    server: {
      dev: {
        command:      'server:dev',
        description:  'Continuously rebuild project on changes, and host locally',
        task:         build.server.web.dev
      },
      prod: {
        command:      'server:prod',
        description:  'Continuously rebuild project minified on changes, and host locally\n',
        task:         build.server.web.prod
      }
    }
  },

  help: {
    npm: {
      command:      'help:npm',
      description:  'Help for those running commands from npm\n',
      task:         help.npm.bind(help)
    }
  }
};