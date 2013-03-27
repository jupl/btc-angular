{config} = require '../config'
setMode = require './build-mode'
setMode 'production', config
exports.config = config