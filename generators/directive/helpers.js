require('sugar');

module.exports = function(Handlebars) {
  Handlebars.registerHelper('dasherize', function(options) {
    return new Handlebars.SafeString(options.fn(this).dasherize());
  });

  Handlebars.registerHelper('lowercamelize', function(options) {
    return new Handlebars.SafeString(options.fn(this).camelize(false));
  });
};
