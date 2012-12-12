{config} = require '../config'
{setDevMode} = require './build-mode'
{setAndroidEnv} = require './build-env'

setDevMode config
setAndroidEnv config

exports.config = config