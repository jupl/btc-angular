{basename} = require 'path'
typeof$ = (obj) -> ({}).toString.call(obj).slice(8, -1)

module.exports = (env, config) =>
  switch env
    when 'web' then setWebEnv config
    when 'cordova' then setCordovaEnv config
    else config

setWebEnv = (config) ->
  config.paths ?= {}
  config.conventions ?= {}
  config.paths.public = 'build/web'
  {ignored} = config.conventions
  config.conventions.ignored = (file) ->
    return true if file is 'app/assets/config.xml' or /^app[\\/]assets[\\/]res/.test(file)
    switch typeof$ ignored
      when 'Function' then ignored file
      when 'RegExp' then ignored.test file
      else basename(file).indexOf('_') is 0
  config

setCordovaEnv = (config) ->
  config.paths ?= {}
  config.paths.public = 'build/cordova/www'
  config