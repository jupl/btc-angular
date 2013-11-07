/**
 * Modify configuration to fill in default options. This is more useful for
 * tasks that require default information.
 * @param  {Object} config
 */
module.exports = function(config) {
  if(!config.server) {
    config.server = {};
  }
  if(!config.server.port) {
    config.server.port = 3333;
  }
};
