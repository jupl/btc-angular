require('mocha-as-promised')();
var chai = require('chai');
var webdriver = require('selenium-webdriver');

global.expect = chai.expect;

global.getDriver = function() {
  return new webdriver.Builder().usingServer('http://localhost:4444').build();
};
