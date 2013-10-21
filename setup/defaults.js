/**
 * [exports description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
module.exports = function(config) {
  if(!config.server) {
    config.server = {};
  }
  if(!config.server.port) {
    config.server.port = 3333;
  }
  if(!config.server.base) {
    config.server.base = '';
  }
};