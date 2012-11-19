{config} = require './base'

config.paths.public = 'build/ios/www'

{joinTo} = config.files.javascripts
joinTo['javascripts/vendor.js'] = /^vendor(\/|\\)(base|ios)/
joinTo['test/javascripts/tests.js'] = /^test(\/|\\)tests(\/|\\)(base|ios)/
joinTo['stylesheets/app.css'] = /^(app|vendor(\/|\\)(base|ios))/

exports.config = config