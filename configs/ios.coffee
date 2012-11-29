{config} = require '../config'

config.paths.public = 'build/ios/www'

{joinTo} = config.files.javascripts
joinTo['javascripts/vendor.js'] = /^vendor(-ios)?(\/|\\)/
joinTo['test/javascripts/tests.js'] = /^test(\/|\\)tests(-ios)?(\/|\\)/
{joinTo} = config.files.stylesheets
joinTo['stylesheets/app.css'] = /^(app|vendor(-ios)?)(\/|\\)/

exports.config = config