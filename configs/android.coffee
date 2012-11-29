{config} = require '../config'

config.paths.public = 'build/android/assets/www'

{joinTo} = config.files.javascripts
joinTo['javascripts/vendor.js'] = /^vendor(-android)?(\/|\\)/
joinTo['test/javascripts/tests.js'] = /^test(\/|\\)tests(-android)?(\/|\\)/
{joinTo} = config.files.stylesheets
joinTo['stylesheets/app.css'] = /^(app|vendor(-android)?)(\/|\\)/

exports.config = config