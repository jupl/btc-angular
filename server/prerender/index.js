var middleware = require('prerender-node');
var spawn = require('child_process').spawn;
var prerenderUrl = '127.0.0.1:' + (process.env.PORT || 3000);

module.exports = function(app) {
  // Start up prerender server
  spawn('node', ['server/prerender/server.js'], {stdio: 'inherit'});

  // Set up prerender middleware and link to server
  middleware.set('prerenderServiceUrl', prerenderUrl);
  app.use(middleware);
}
