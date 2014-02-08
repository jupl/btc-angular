var express = require('express');
var jsonfile = require('jsonfile');

module.exports = function(app) {
  // Check if Connect Mongo is available
  var dependencies = jsonfile.readFileSync('package.json').dependencies;
  if(!dependencies['connect-mongo']) {
    return;
  }

  // Set up sessions with MongoDB
  var MongoStore = require('connect-mongo')(express);
  app.use(express.session({
    secret: 'PLACEHOLDER',
    store: new MongoStore({db: 'sessions'})
  }));
};
