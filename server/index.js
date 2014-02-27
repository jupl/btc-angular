'use strict';

var express = require('express');
var http = require('http');
var path = require('path');

exports.startServer = function(port, publicPath, callback) {
  var app = express();
  var server = http.createServer(app);
  var indexPath = path.join(publicPath, 'index.html');

  // Add middleware
  app.use(express.compress());
  app.use(express.static(publicPath));

  // Set other paths to index.html for HTML5 push state apps
  app.get('*', function(request, response) {
    response.sendfile(indexPath);
  });

  // Start up server
  server.listen(port, callback);
  return server;
};
