require('sugar');

module.exports = function(Handlebars) {
  Handlebars.registerHelper('dasherize', function(options) {
    return new Handlebars.SafeString(options.fn(this).dasherize());
  });
};
