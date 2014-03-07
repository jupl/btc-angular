'use strict';

// Tasks to add modules to the project that are not included by default.
// This is usually either Bower packages or NPM packages.
var fs = require('fs');

namespace('add', function() {
  desc('Add jQuery');
  task('jquery', function() {
    editBower(function() {
      this.dependencies['jquery'] = '~2.1.0';
    });
  });

  desc('Add normalize.css');
  task('normalize', function() {
    editBower(function() {
      this.dependencies['normalize-css'] = '~3.0.0';
    });
  });

  desc('Add FastClick (remove click delay in mobile)');
  task('fastclick', function() {
    editBower(function() {
      this.dependencies.fastclick = '~1.0.0';
    });
  });

  desc('Add Hammer.js (touch library)');
  task('hammer', function() {
    editBower(function() {
      this.dependencies.hammerjs = '~1.0.6';
    });
  });

  desc('Add Hammer.js (see above) as a jQuery plugin');
  task('hammerjquery', ['add:hammer'], function() {
    editBower(function() {
      this.dependencies['jquery-hammerjs'] = this.dependencies.hammerjs;
    });
  });

  desc('Add device.js (device information for CSS and JS)');
  task('devicejs', function() {
    editBower(function() {
      this.dependencies.devicejs = 'git://github.com/matthewhudson/device.js.git';
      this.overrides.devicejs = {
        main: 'lib/device.js'
      };
    });
  });
});

namespace('rem', function() {
  desc('Remove jQuery');
  task('jquery', function() {
    editBower(function() {
      delete this.dependencies['jquery'];
    });
  });

  desc('Remove normalize.css');
  task('normalize', function() {
    editBower(function() {
      delete this.dependencies['normalize-css'];
    });
  });

  desc('Remove FastClick');
  task('fastclick', function() {
    editBower(function() {
      delete this.dependencies.fastclick;
    });
  });

  desc('Remove Hammer.js');
  task('hammer', function() {
    editBower(function() {
      delete this.dependencies.hammerjs;
      delete this.dependencies['jquery-hammerjs'];
    });
  });

  desc('Remove device.js');
  task('devicejs', function() {
    editBower(function() {
      delete this.dependencies.devicejs;
      delete this.overrides.devicejs;
    });
  });
});

function editBower(callback) {
  var json = JSON.parse(fs.readFileSync('bower.json'));
  callback.call(json);
  fs.writeFileSync('bower.json', JSON.stringify(json, null, 2) + '\n');
}
