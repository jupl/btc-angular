var fork = require('child_process').fork;
var jsonfile = require('jsonfile');

module.exports = function(app) {
  // Check if Prerender is available
  var dependencies = jsonfile.readSync('package.json').dependencies;
  if(!dependencies.prerender || !dependencies['prerender-node']) {
    return;
  }

  // Start up Prerender server
  var child = fork('server/prerender/server');
  process.on('exit', function() {
    child.kill();
  });

  // Set up Prerender middleware and link to server
  var middleware = require('prerender-node');
  var prerenderUrl = 'http://127.0.0.1:' + (process.env.PORT || 3000);
  middleware.set('prerenderServiceUrl', prerenderUrl);
  app.use(middleware);
};
