{config} = require '../config'
{setProdMode} = require './build-mode'
{setIOSEnv} = require './build-env'

setProdMode config
setIOSEnv config

exports.config = 