// Adjust Brunch configuration object to fit a specific platform
module.exports = function(platform, config) {
  switch(platform) {
    case 'web':
      webPlatform(config);
      break;
  }
};

// List of platforms supported
module.exports.platforms = ['web'];

// For a generic web app, simply specify public directory
function webPlatform(config) {
  if(!config.paths) {
    config.paths = {};
  }
  config.paths.public = 'build/web';
}