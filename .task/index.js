'use strict';

var bower = require('./tasks/bower');
var build = require('./tasks/build');
var help = require('./tasks/help');
var cordova = require('./tasks/cordova');
var modul = {
  fastclick:  require('./tasks/modules/fastclick'),
  hammer:     require('./tasks/modules/hammer')
};

module.exports = {
  add: {
    fastclick: {
      description:  'Add Fastclick',
      task:         function(){ modul.fastclick.add() }
    },
    hammer: {
      description:  'Add Hammer.js as standalone',
      task:         function(){ modul.hammer.add() },

      jquery: {
        description:  'Add Hammer.js as jQuery plugin\n',
        task:         function(){ modul.hammer.jquery.add() }
      }
    }
  },

  rem: {
    fastclick: {
      description:  'Remove Fastclick',
      task:         function(){ modul.fastclick.remove() }
    },
    hammer: {
      description:  'Add Hammer.js as standalone\n',
      task:         function(){ modul.hammer.remove() }
    }
  },

  cordova: {
    init: {
      description:  'Create a new Cordova project',
      task:         function(){ cordova.initialize() }
    },
    add: {
      android: {
        description:  'Add Android platform support to the Cordova project',
        task:         function(){ cordova.add.android() }
      },
      ios: {
        description:  'Add iOS platform support to the Cordova project',
        task:         function(){ cordova.add.ios() }
      }
    },
    rem: {
      android: {
        description:  'Remove Android platform support from the Cordova project',
        task:         function(){ cordova.remove.android() }
      },
      ios: {
        description:  'Remove iOS platform support from the Cordova project\n',
        task:         function(){ cordova.remove.ios() }
      }
    }
  },

  bower: {
    install: {
      description:  'Download and install Bower dependencies\n',
      task:         function(){ bower.install() }
    }
  },

  build: {
    dev: {
      description:  'Build project for web',
      task:         function(){ build.once.web.dev() }
    },
    prod: {
      description:  'Build project for web minified',
      task:         function(){ build.once.web.prod() }
    },

    android: {
      dev: {
        description:  'Build and compile project for Android',
        task:         function(){ build.once.android.dev() }
      },
      prod: {
        description:  'Build and compile project for Android minified',
        task:         function(){ build.once.android.prod() }
      }
    },

    ios: {
      dev: {
        description:  'Build and compile project for iOS',
        task:         function(){ build.once.ios.dev() }
      },
      prod: {
        description:  'Build and compile project for iOS minified\n',
        task:         function(){ build.once.ios.prod() }
      }
    }
  },

  watch: {
    dev: {
      description:  'Continuously rebuild project on changes for web',
      task:         function(){ build.watch.web.dev() }
    },
    prod: {
      description:  'Continuously rebuild project minified on changes for web\n',
      task:         function(){ build.watch.web.prod() }
    }
  },

  server: {
    dev: {
      description:  'Continuously rebuild project on changes, and host locally for web',
      task:         function(){ build.server.web.dev() }
    },
    prod: {
      description:  'Continuously rebuild project minified on changes, and host locally for web\n',
      task:         function(){ build.server.web.prod() }
    }
  },

  emulate: {
    android: {
      dev: {
        description:  'Build, compile, and deploy project to Android emulator',
        task:         function(){ build.emulate.android.dev() }
      },
      prod: {
        description:  'Build, compile, and deploy project minified to Android emulator',
        task:         function(){ build.emulate.android.prod() }
      }
    },
    ios: {
      dev: {
        description:  'Build, compile, and deploy project to iOS simulator',
        task:         function(){ build.emulate.ios.dev() }
      },
      prod: {
        description:  'Build, compile, and deploy project minified to iOS simulator\n',
        task:         function(){ build.emulate.ios.prod() }
      }
    }
  },

  help: {
    npm: {
      description:  'Help for those running commands from npm\n',
      task:         function(){ help.npm() }
    }
  }
};