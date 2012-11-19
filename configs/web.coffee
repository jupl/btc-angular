{config} = require './base'

config.paths.public = 'build/web'

{joinTo} = config.files.javascripts
joinTo['javascripts/vendor.js'] = /^vendor(\/|\\)(base|web)/
joinTo['test/javascripts/tests.js'] = /^test(\/|\\)tests(\/|\\)(base|web)/
joinTo['stylesheets/app.css'] = /^(app|vendor(\/|\\)(base|web))/

exports.config = config