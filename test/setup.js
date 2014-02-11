'use strict';

require('mocha-as-promised')();
var chai = require('chai');
var webdriver = require('selenium-webdriver');
var config = require('../brunch-config').config;

// Expose Chai assertions
global.assert = chai.assert;
global.expect = chai.expect;
global.should = chai.should();

// Expose driver with a site
global.getDriver = function() {
  return new webdriver.Builder().usingServer('http://localhost:4444').build();
};

// Expose base url of server
global.baseUrl = 'http://localhost:' + config.server.port;
