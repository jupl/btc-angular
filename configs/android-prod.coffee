{config} = require '../config'
{setProdMode} = require './build-mode'
{setAndroidEnv} = require './build-env'

setProdMode config
setAndroidEnv config

exports.config = config