Exec = require '../lib/exec'

module.exports = class Build extends Exec
  command: './node_modules/.bin/brunch'

  onceAndroidDev: => @_build ['build', '-c', 'configs/android'], prod: no
  onceAndroidProd: => @_build ['build', '-c', 'configs/android'], prod: yes
  onceIOSDev: => @_build ['build', '-c', 'configs/ios'], prod: no
  onceIOSProd: => @_build ['build', '-c', 'configs/ios'], prod: yes
  onceWebDev: => @_build ['build', '-c', 'configs/web'], prod: no
  onceWebProd: => @_build ['build', '-c', 'configs/web'], prod: yes

  watchAndroidDev: => @_build ['watch', '-c', 'configs/android'], prod: no
  watchAndroidProd: => @_build ['watch', '-c', 'configs/android'], prod: yes
  watchIOSDev: => @_build ['watch', '-c', 'configs/ios'], prod: no
  watchIOSProd: => @_build ['watch', '-c', 'configs/ios'], prod: yes
  watchWebDev: => @_build ['watch', '-c', 'configs/web'], prod: no
  watchWebProd: => @_build ['watch', '-c', 'configs/web'], prod: yes
  serverDev: => @_build ['watch', '-s', '-c', 'configs/web'], prod: no
  serverProd: => @_build ['watch', '-s', '-c', 'configs/web'], prod: yes

  _build: (args, {prod} = {prod: no}) =>
    args.push '-m' if prod
    @exec args