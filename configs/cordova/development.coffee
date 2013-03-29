{config} = require '../../config'
setMode = require '../build-mode'
setEnvironment = require '../build-environment'
setMode 'development', config
setEnvironment 'cordova', config
exports.config = config