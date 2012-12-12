{config} = require '../config'
{setProdMode} = require './build-mode'
{setWebEnv} = require './build-env'

setProdMode config
setWebEnv config

console.log config
exports.config = config