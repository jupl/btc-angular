require('sugar');

module.exports = function(Handlebars) {
  Handlebars.registerHelper('humanize', function(options) {
    return new Handlebars.SafeString(options.fn(this).underscore().humanize());
  });

  Handlebars.registerHelper('dasherize', function(options) {
    return new Handlebars.SafeString(options.fn(this).dasherize());
  });
};
