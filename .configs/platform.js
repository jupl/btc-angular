'use strict';

module.exports = function(platform, config) {
  switch(platform) {
    case 'web':
      webPlatform(config);
      break;
  }
};

module.exports.platforms = ['web'];

function webPlatform(config) {
  if(!config.paths) {
    config.paths = {};
  }
  config.paths.public = 'build/web';
}