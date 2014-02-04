var middleware = require('prerender-node');
var spawn = require('child_process').spawn;
var prerenderUrl = 'http://127.0.0.1:' + (process.env.PORT || 3000);

module.exports = function(app) {
  // Start up prerender server
  var child = spawn('node', ['server/prerender/server.js'], {stdio: 'inherit'});
  process.on('exit', function() {
    child.kill();
  });

  // Set up prerender middleware and link to server
  middleware.set('prerenderServiceUrl', prerenderUrl);
  app.use(middleware);
}
