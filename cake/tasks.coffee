tasks =
  build:    require './tasks/build'
  cordova:  require './tasks/cordova'
  help:     require './tasks/help'
  test:     require './tasks/test'

tasks[key] = new value for key, value of tasks

module.exports =

  cordova:
    android:
      command:      'cordova:android'
      description:  'Create a new Eclipse Android project with Cordova'
      task:         tasks.cordova.android
    ios:
      command:      'cordova:ios'
      description:  'Create a new XCode iOS project with Cordova\n'
      task:         tasks.cordova.ios

  build:
    android:
      dev:
        command:      'build:android:dev'
        description:  'Build project once for Android'
        task:         tasks.build.onceAndroidDev
      prod:
        command:      'build:android:prod'
        description:  'Build project once for Android minified'
        task:         tasks.build.onceAndroidProd
    ios:
      dev:
        command:      'build:ios:dev'
        description:  'Build project once for iOS'
        task:         tasks.build.onceIOSDev
      prod:
        command:      'build:ios:prod'
        description:  'Build project once for iOS minified'
        task:         tasks.build.onceIOSProd
    web:
      dev:
        command:      'build:web:dev'
        description:  'Build project once for web'
        task:         tasks.build.onceWebDev
      prod:
        command:      'build:web:prod'
        description:  'Build project once for web minified\n'
        task:         tasks.build.onceWebProd

  watch:
    android:
      dev:
        command:      'watch:android:dev'
        description:  'Continuously build on changes for Android'
        task:         tasks.build.watchAndroidDev
      prod:
        command:      'watch:android:prod'
        description:  'Continuously build on changes for Android minified'
        task:         tasks.build.watchAndroidProd
    ios:
      dev:
        command:      'watch:ios:dev'
        description:  'Continuously build on changes for iOS'
        task:         tasks.build.watchIOSDev
      prod:
        command:      'watch:ios:prod'
        description:  'Continuously build on changes for iOS minified'
        task:         tasks.build.watchIOSProd
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