module.exports = (env, config) =>
  if env is 'web'
    setEnv config
  else
    config

setWebEnv = (config) ->
  config.conventions ?= {}
  {ignored} = config.conventions
  config.conventions.ignored = (file) ->
    return true if file is 'app/assets/config.xml' or /^app[\\/]assets[\\/]res/.test(file)
    switch typeof$ ignored
      when 'Function' then ignored file
      when 'RegExp' then ignored.test file
      else basename(file).indexOf('_') is 0
      config