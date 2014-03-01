'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var setupBrowserSync = require('./browser-sync');
var setupPassport = require('./passport');
var setupPrerender = require('./prerender');
var setupRoutes = require('./routes');
var setupSession = require('./session');

exports.startServer = function(port, publicPath, callback) {
  var app = express();
  var server = http.createServer(app);
  var indexPath = path.join(publicPath, 'index.html');

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

  // Set other paths to index.html for HTML5 push state apps
  app.get('*', function(request, response) {
    response.sendfile(indexPath);
  });

  // Start up server (and BrowserSync if specified)
  server.listen(port, function(err) {
    callback.apply(null, arguments);
    if(!err && process.env.browsersync === 'true') {
      setupBrowserSync(port, publicPath);
    }
  });

  return server;
};
