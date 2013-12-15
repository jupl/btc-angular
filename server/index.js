var express = require('express');
var http = require('http');
var path = require('path');

exports.startServer = function(port, publicPath, callback) {
  var app = express();

  // Point to generated static files
  app.use(express.static(publicPath));

  // Define web services
  // app.use(express.json());
  // app.use(express.urlencoded());
  // app.use(app.router);
  // app.post(...);

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
