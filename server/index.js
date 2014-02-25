'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var setupRoutes = require('./routes');

exports.startServer = function(port, publicPath, callback) {
  var app = express();
  var server = http.createServer(app);

  // Add middleware
  app.use(express.compress());
  app.use(express.static(publicPath));
  setupRoutes(app);

  // Set other paths to index.html for HTML5 pushState apps
  var indexPath = path.resolve(publicPath, 'index.html');
  app.get('*', function(request, response) {
    response.sendfile(indexPath);
  });

  // Start up server
  server.listen(port, callback);
  return server;
};
