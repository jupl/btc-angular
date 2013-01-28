Exec = require '../lib/exec'

wrench = require 'wrench'

module.exports = class Build extends Exec
  command: './node_modules/.bin/brunch'

  onceAndroidDev: => @_build ['build', '-c', 'configs/android-dev'], prod: no
  onceAndroidProd: => @_build ['build', '-c', 'configs/android-prod'], prod: yes
  onceIOSDev: => @_build ['build', '-c', 'configs/ios-dev'], prod: no
  onceIOSProd: => @_build ['build', '-c', 'configs/ios-prod'], prod: yes
  onceWebDev: => @_build ['build', '-c', 'configs/web-dev'], prod: no
  onceWebProd: => @_build ['build', '-c', 'configs/web-prod'], prod: yes

  watchAndroidDev: => @_build ['watch', '-c', 'configs/android-dev'], prod: no
  watchAndroidProd: => @_build ['watch', '-c', 'configs/android-prod'], prod: yes
  watchIOSDev: => @_build ['watch', '-c', 'configs/ios-dev'], prod: no
  watchIOSProd: => @_build ['watch', '-c', 'configs/ios-prod'], prod: yes
  watchWebDev: => @_build ['watch', '-c', 'configs/web-dev'], prod: no
  watchWebProd: => @_build ['watch', '-c', 'configs/web-prod'], prod: yes

  serverDev: => @_build ['watch', '-c', 'configs/web-dev', '-s'], prod: no
  serverProd: => @_build ['watch', '-c', 'configs/web-prod', '-s'], prod: yes

  _build: (args, {prod} = {prod: no}) =>
    # Before running the brunch command let's clear the public folder
    {config} = require "../../#{args[2]}"
    wrench.rmdirSyncRecursive config.paths.public, ->

    # Run brunch command
    args.push '-o' if prod
    @exec args