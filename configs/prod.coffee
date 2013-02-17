{config} = require '../config'
setMode = require './build-mode'
setMode 'prod', config
exports.config = config