'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(port, publicPath) {
  var paths = [
    path.join(publicPath, '**/*'),
    '!**/*.{appcache,map}'
  ];

  // Wait until public path is available
  var id = setInterval(function() {
    if(fs.existsSync(publicPath)) {
      clearInterval(id);
      require('browser-sync').init(paths, {proxy: 'localhost: ' + port});
    }
  }, 500);
};
