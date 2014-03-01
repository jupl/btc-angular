'use strict';

var passport = require('passport');
var User = require('../models/user');
var strategies = [
  require('./local')
];

/**
 * Set up Passport and connect to the application. Passport will use the user
 * model.
 * @param {Express} app Express application to add Passport to.
 */
module.exports = function(app) {
  // Hook in with user model
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, '-password').exec(done);
  });

  // Add any strategies required
  strategies.forEach(function(strategy) {
    passport.use(strategy);
  });

  // Connect middleware
  app.use(passport.initialize());
  app.use(passport.session());
};
