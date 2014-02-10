'use strict';

require('sugar');

module.exports = function(Handlebars) {
  Handlebars.registerHelper('camelize', function(string) {
    return string.camelize(false);
  });

  Handlebars.registerHelper('dasherize', function(string) {
    return string.dasherize();
  });

  Handlebars.registerHelper('humanize', function(string) {
    return string.underscore().humanize();
  });

  Handlebars.registerHelper('underscore', function(string) {
    return string.underscore();
  });

  Handlebars.registerHelper('uppercamelize', function(string) {
    return string.camelize(true);
  });
};
