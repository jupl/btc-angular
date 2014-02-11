'use strict';

var express = require('express');
var http = require('http');
var path = require('path');

exports.startServer = function(port, publicPath, callback) {
  var app = express();

  // Add middleware
  app.use(express.compress());
  app.use(express.static(publicPath));

  // Start up server
  var server = http.createServer(app);
  server.listen(port, callback);
  return server;
};
