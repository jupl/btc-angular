'use strict';

var express = require('express');
var MongoStore = require('connect-mongo')(express);
var config = require('./config');

module.exports = function(app) {
  // Set up sessions with MongoDB
  app.use(express.session({
    secret: config.session.secret,
    store: new MongoStore({url: config.session.mongoUri})
  }));
};
