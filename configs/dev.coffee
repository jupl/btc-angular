{config} = require '../config'
setMode = require './build-mode'
setMode 'dev', config
exports.config = config