{config} = require './base'

config.paths.public = 'build/android/assets/www'

{joinTo} = config.files.javascripts
joinTo['javascripts/vendor.js'] = /^vendor(\/|\\)(base|android)/
joinTo['test/javascripts/tests.js'] = /^test(\/|\\)tests(\/|\\)(base|android)/
joinTo['stylesheets/app.css'] = /^(app|vendor(\/|\\)(base|android))/

exports.config = config