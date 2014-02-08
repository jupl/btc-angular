var jsonfile = require('jsonfile');

/**
 * Set up Prerender if it is available and connect to the application.
 * @param {Express} app Express application to add Passport to.
 */
module.exports = function(app) {
  // Check if Prerender is available
  var dependencies = jsonfile.readFileSync('package.json').dependencies;
  if(!dependencies.prerender) {
    return;
  }

  // Set up Prerender middleware and link to server
  var middleware = require('prerender-node');
  var prerenderUrl = 'http://127.0.0.1:3000';
  middleware.set('prerenderServiceUrl', prerenderUrl);
  app.use(middleware);
};
