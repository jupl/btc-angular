{config} = require '../config'
{setDevMode} = require './build-mode'
{setIOSEnv} = require './build-env'

setDevMode config
setIOSEnv config

exports.config = config