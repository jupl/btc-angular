{config} = require '../../config'
setMode = require '../build-mode'
setEnvironment = require '../build-environment'
setMode 'development', config
setEnvironment 'web', config
exports.config = config