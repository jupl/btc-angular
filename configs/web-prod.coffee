{config} = require '../config'
{setProdMode} = require './build-mode'
{setWebEnv} = require './build-env'

setProdMode config
setWebEnv config

exports.config = config