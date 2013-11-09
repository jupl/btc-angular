require('mocha-as-promised')();
var chai = require('chai');
var webdriver = require('selenium-webdriver');

global.assert = chai.assert;
global.expect = chai.expect;
global.should = chai.should();

global.getDriver = function() {
  return new webdriver.Builder().usingServer('http://localhost:4444').build();
};
