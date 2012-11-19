var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

module.exports = {
  should: chai.should(),
  sinon: sinon
};