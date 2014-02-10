'use strict';

var connection = require('./index');
var bcrypt = require('bcryptjs');
var Schema = require('mongoose').Schema;

var schema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    validate: /^\S+$/
  },
  password: String
});

// May change if using multiple strategies for Passport.
schema.path('username').required(true);
schema.path('password').required(true);

schema.path('password').set(function(password) {
  return bcrypt.hashSync(password, 12);
});

schema.method('authenticate', function(password) {
  return bcrypt.compareSync(password, this.password);
});

module.exports = connection.model('User', schema);
