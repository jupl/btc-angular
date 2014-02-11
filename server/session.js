'use strict';

var express = require('express');
var config = require('./config');

module.exports = function(app) {
  // Check if Connect Mongo is available
  try {
    var MongoStore = require('connect-mongo')(express);
  }
  catch(e) {
    return;
  }

  // Set up sessions with MongoDB
  app.use(express.session({
    secret: config.session.secret,
    store: new MongoStore({url: config.session.mongoUri})
  }));
};
