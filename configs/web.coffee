{config} = require '../config'

config.paths.public = 'build/web'

{joinTo} = config.files.javascripts
joinTo['javascripts/vendor.js'] = /^vendor(-web)?(\/|\\)/
joinTo['test/javascripts/tests.js'] = /^test(\/|\\)tests(-web)?(\/|\\)/
{joinTo} = config.files.stylesheets
joinTo['stylesheets/app.css'] = /^(app|vendor(-web)?)(\/|\\)/

exports.config = config