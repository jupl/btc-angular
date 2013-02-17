tasks =
  build:    require './tasks/build'
  cordova:  require './tasks/cordova'
  help:     require './tasks/help'
  test:     require './tasks/test'

tasks[key] = new value for key, value of tasks

module.exports =

  cordova:
    init:
      default:
        command:      'cordova:init'
        description:  'Create a new Cordova project'
        task:         tasks.cordova.init
      android:
        command:      'cordova:init:android'
        description:  'Create a new Cordova project with support for the Android platform'
        task:         tasks.cordova.initAndroid
      ios:
        command:      'cordova:init:ios'
        description:  'Create a new Cordova project with support for the iOS platform'
        task:         tasks.cordova.initIOS
      all:
        command:      'cordova:init:all'
        description:  'Create a new Cordova project supporting all available platforms'
        task:         tasks.cordova.initAll
    add:
      android:
        command:      'cordova:add:android'
        description:  'Add Android platform support to the Cordova project'
        task:         tasks.cordova.addAndroid
      ios:
        command:      'cordova:add:ios'
        description:  'Add iOS platform support to the Cordova project'
        task:         tasks.cordova.addIOS
      all:
        command:      'cordova:add:all'
        description:  'Add all platform support to the Cordova project'
        task:         tasks.cordova.addAll
    remove:
      android:
        command:      'cordova:rm:android'
        description:  'Remove Android platform support from the Cordova project'
        task:         tasks.cordova.removeAndroid
      ios:
        command:      'cordova:rm:ios'
        description:  'Remove iOS platform support from the Cordova project'
        task:         tasks.cordova.removeIOS
      all:
        command:      'cordova:rm:all'
        description:  'Remove all platform support from the Cordova project\n'
        task:         tasks.cordova.removeAll

  build:
    android:
      dev:
        command:      'build:android:dev'
        description:  'Build project once for Android and deploy to a connected device'
        task:         tasks.build.onceAndroidDev
      prod:
        command:      'build:android:prod'
        description:  'Build project once for Android minified and deploy to a connected device'
        task:         tasks.build.onceAndroidProd
    ios:
      dev:
        command:      'build:ios:dev'
        description:  'Build project once for iOS and deploy to a connected device'
        task:         tasks.build.onceIOSDev
      prod:
        command:      'build:ios:prod'
        description:  'Build project once for iOS minified and deploy to a connected device'
        task:         tasks.build.onceIOSProd
    web:
      dev:
        command:      'build:web:dev'
        description:  'Build project once for web'
        task:         tasks.build.onceWebDev
      prod:
        command:      'build:web:prod'
        description:  'Build project once for web minified'
        task:         tasks.build.onceWebProd
    all:
      dev:
        command:      'build:all:dev'
        description:  'Build project once for all platforms and deploy to connected devices where applicable'
        task:         tasks.build.onceAllDev
      prod:
        command:      'build:all:prod'
        description:  'Build project once for all platforms minified and deploy to connected devices where applicable\n'
        task:         tasks.build.onceAllProd

  watch:
    cordova:
      dev:
        command:      'watch:cordova:dev'
        description:  'Continuously build on changes for Cordova'
        task:         tasks.build.watchCordovaDev
      prod:
        command:      'watch:cordova:prod'
        description:  'Continuously build on changes for Cordova minified'
        task:         tasks.build.watchCordovaProd
    web:
      dev:
        command:      'watch:web:dev'
        description:  'Continuously build on changes for web'
        task:         tasks.build.watchWebDev
      prod:
        command:      'watch:web:prod'
        description:  'Continuously build on changes for web minified\n'
        task:         tasks.build.watchWebProd

  server:
    dev:
      command:      'server:dev'
      description:  'Continuously build on changes for web and host locally'
      task:         tasks.build.serverDev
    prod:
      command:      'server:prod'
      description:  'Continuously build on changes for web minified and host locally\n'
      task:         tasks.build.serverProd

  emulate:
    android:
      dev:
        command:      'emulate:android:dev'
        description:  'Build project once for Android'
        task:         tasks.build.emulateAndroidDev
      prod:
        command:      'emulate:android:prod'
        description:  'Build project once for Android minified'
        task:         tasks.build.emulateAndroidProd
    ios:
      dev:
        command:      'emulate:ios:dev'
        description:  'Build project once for iOS'
        task:         tasks.build.emulateIOSDev
      prod:
        command:      'emulate:ios:prod'
        description:  'Build project once for iOS minified'
        task:         tasks.build.emulateIOSProd
    all:
      dev:
        command:      'emulate:all:dev'
        description:  'Build project once for all platforms'
        task:         tasks.build.emulateAllDev
      prod:
        command:      'emulate:all:prod'
        description:  'Build project once for all platforms minified\n'
        task:         tasks.build.emulateAllProd

  test:
    terminal:
      command:      'test'
      description:  'Run test tasks in terminal using jsdom\n'
      task:         tasks.test.terminal

  help:
    npm:
      command:      'help:npm'
      description:  'Help for those running commands from npm\n'
      task:         tasks.help.npm