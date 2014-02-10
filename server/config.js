'use strict';

var path = require('path');

module.exports = {
  session: {
    mongoUri: 'mongodb://localhost/sessions',
    secret: process.env.SESSION_SECRET || 'PLACEHOLDER'
  },
  server: {
    mongoUri: 'mongodb://localhost/models',
  }
};
