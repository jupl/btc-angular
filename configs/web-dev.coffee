{config} = require '../config'
{setDevMode} = require './build-mode'
{setWebEnv} = require './build-env'

setDevMode config
setWebEnv config

exports.config = config