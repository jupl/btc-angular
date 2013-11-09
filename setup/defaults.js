require('sugar');

/**
 * Modify configuration to fill in default options. This is more useful for
 * tasks that require default information.
 * @param  {Object} config
 */
module.exports = function(config) {
  var jsJoinTo = config.files.javascripts.joinTo;
  var cssJoinTo = config.files.stylesheets.joinTo;

  if(!config.server) {
    config.server = {};
  }
  if(!config.server.port) {
    config.server.port = 3333;
  }

  // Ignore test files in Bower
  Object.keys(jsJoinTo).forEach(function(key) {
    jsJoinTo[key] = ignoreBowerTest(jsJoinTo[key]);
  });
  Object.keys(cssJoinTo).forEach(function(key) {
    cssJoinTo[key] = ignoreBowerTest(cssJoinTo[key]);
  });
};

/**
 * Creates a function that ignores Bower files that are related to testing.
 * @param  {Function|RegExp|String} oldTest Exising test to wrap around
 * @return {Function}
 */
function ignoreBowerTest(oldTest) {
  return function(path) {
    if(/^bower_components[\\\/](chai|mocha|sinon)/.test(path)) {
      return false;
    }
    else if(Object.isString(oldTest)) {
      return oldTest === path;
    }
    else if(Object.isFunction(oldTest)) {
      return oldTest(path);
    }
    else if(Object.isRegExp(oldTest)) {
      return oldTest.test(path);
    }
  }
}
