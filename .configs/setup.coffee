require 'sugar'
setMode = require '../build-mode'
setEnvironment = require '../build-environment'

module.exports = (config) ->
  config = Object.clone(config, deep: yes)
  setEnvironment 'web', config

  developmentConfig = Object.clone(config, deep: yes)
  productionConfig = Object.clone(config, deep: yes)

  setMode 'development', developmentConfig
  setMode 'production', productionConfig

  overrides:
    development: developmentConfig
    production: productionConfig