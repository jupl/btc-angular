'use strict';

var bower = require('./tasks/bower');
var build = require('./tasks/build');
var help = require('./tasks/help');

module.exports = {
  bower: {
    install: {
      description:  'Download and install Bower dependencies\n',
      task:         function(){ bower.install() }
    }
  },

  build: {
    dev: {
      description:  'Build project',
      task:         function(){ build.once.web.dev() }
    },
    prod: {
      description:  'Build project minified',
      task:         function(){ build.once.web.prod() }
    }
  },

  watch: {
    dev: {
      description:  'Continuously rebuild project on changes',
      task:         function(){ build.watch.web.dev() }
    },
    prod: {
      description:  'Continuously rebuild project minified on changes',
      task:         function(){ build.watch.web.prod() }
    }
  },

  server: {
    dev: {
      description:  'Continuously rebuild project on changes, and host locally',
      task:         function(){ build.server.web.dev() }
    },
    prod: {
      description:  'Continuously rebuild project minified on changes, and host locally\n',
      task:         function(){ build.server.web.prod() }
    }
  },

  help: {
    npm: {
      description:  'Help for those running commands from npm\n',
      task:         function(){ help.npm() }
    }
  }
};