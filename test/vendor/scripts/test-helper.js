// Enable Brunch auto-reload if available
window.brunch = window.brunch || {};
window.brunch['auto-reload'] = {enabled: true};

// Create `window.describe` etc. for our BDD-like tests.
mocha.setup({ui: 'bdd'});

// Create another global variable for simpler syntax.
// Uncomment should to use should assertion style.
window.assert = chai.assert;
window.expect = chai.expect;
// window.should = chai.should();