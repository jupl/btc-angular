var express = require('express');
var http = require('http');
var path = require('path');
var setupPrerender = require('./prerender');
var setupRoutes = require('./routes');

exports.startServer = function(port, publicPath, callback) {
  var app = express();

  // Uncomment to use Prerender
  // setupPrerender(app);

  // Point to generated static files
  app.use(express.static(publicPath));

  // Uncomment to append custom routes/services/proxies/etc.
  // setupRoutes(app);

  // Set other paths to index.html for HTML5 pushState apps
  var indexPath = path.resolve(publicPath, 'index.html');
  app.get('*', function(request, response) {
    response.sendfile(indexPath);
  });

  // Start up server
  var server = http.createServer(app);
  server.listen(port, callback);
  return server;
};
