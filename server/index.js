'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var setupPassport = require('./passport');
var setupPrerender = require('./prerender');
var setupRoutes = require('./routes');
var setupSession = require('./session');

exports.startServer = function(port, publicPath, callback) {
  var app = express();

  // Add middleware
  app.use(express.compress());
  setupPrerender(app);
  app.use(express.static(publicPath));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.cookieParser());
  setupSession(app);
  setupPassport(app);
  setupRoutes(app);

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
