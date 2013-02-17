{config} = require './dev'
config.paths ?= {}
config.paths.public = 'build/cordova/www'
exports.config = config