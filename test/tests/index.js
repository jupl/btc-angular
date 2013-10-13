// This bootstraps the test system. DO NOT REMOVE THIS FILE.

// Set up Mocha and Chai
mocha.setup({ui: 'bdd', reporter: 'html'});
window.expect = chai.expect;
chai.use(sinonChai);

// Load all test modules (modules have a -test suffix)
var modules = window.require.list();
for(var index = 0; index < modules.length; index++) {
  if(/-test$/.test(modules[index])) {
    require(modules[index]);
  }
}

// Start running the test
if(window.mochaPhantomJS) {
  mochaPhantomJS.run();
}
else {
  mocha.run();
}