var express = require('express');

module.exports = function(app) {
  // Set up use of routes and services
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(app.router);

  // app.post(...);
};
