{config} = require '../config'
setMode = require './build-mode'
setEnv = require './build-env'
setMode 'dev', config
setEnv 'cordova', config
exports.config = config