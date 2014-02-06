var fork = require('child_process').fork;
var prerenderUrl = 'http://127.0.0.1:' + (process.env.PORT || 3000);

module.exports = function(app) {
  // Check if Prerender is available
  try {
    require.resolve('prerender');
    require.resolve('prerender-node');
  }
  catch(e) {
    return;
  }

  // Start up Prerender server
  var child = fork('server/prerender/server');
  process.on('exit', function() {
    child.kill();
  });

  // Set up Prerender middleware and link to server
  var middleware = require('prerender-node');
  middleware.set('prerenderServiceUrl', prerenderUrl);
  app.use(middleware);
};
