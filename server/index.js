'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var setupBrowserSync = require('./browser-sync');

exports.startServer = function(port, publicPath, callback) {
  var app = express();
  var indexPath = path.join(publicPath, 'index.html');

  // Add middleware
  app.use(express.compress());
  app.use(express.static(publicPath));

  // Set other paths to index.html for HTML5 push state apps
  app.get('*', function(request, response) {
    response.sendfile(indexPath);
  });

  // Start up server (and BrowserSync if specified)
  return http.createServer(app).listen(port, function(err) {
    callback.apply(null, arguments);
    if(!err && process.env.browsersync === 'true') {
      setupBrowserSync(port, publicPath);
    }
  });
};
