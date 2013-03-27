{config} = require '../config'
setMode = require './build-mode'
setMode 'development', config
exports.config = config