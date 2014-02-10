'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
function(username, password, done) {
  User.findOne({username: username}).exec(function(err, user) {
    if(err) {
      done(err);
    }
    else if(!user) {
      done(null, false, {message: 'Unknown user'});
    }
    else if(!user.authenticate(password)) {
      done(null, false, {message: 'Invalid password'});
    }
    else {
      done(null, user);
    }
  });
});
