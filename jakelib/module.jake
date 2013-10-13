var jsonfile = require('jsonfile');

namespace('add', function() {
  desc('Add jQuery');
  task('jquery', function() {
    editBower(function() {
      this.dependencies.jquery = '~2.0.3';
    });
  });
});

namespace('rem', function() {
  desc('Remove jQuery');
  task('jquery', function() {
    editBower(function() {
      delete this.dependencies.jquery;
    });
  });
});

function editBower(callback) {
  var json = jsonfile.readFileSync('bower.json');
  callback.call(json);
  jsonfile.writeFileSync('bower.json', json);
}