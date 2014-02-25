'use strict';

var express = require('express');
var http = require('http');
var path = require('path');

exports.startServer = function(port, publicPath, callback) {
  var app = express();
  var server = http.createServer(app);

  // Add middleware
  app.use(express.compress());
  app.use(express.static(publicPath));

  // Start up server
  server.listen(port, callback);
  return server;
};
