'use strict';

// Set up modules
angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.filters', []);
angular.module('app.services', []);
angular.module('app', [
  'app.controllers',
  'app.directives',
  'app.filters',
  'app.services',
  'ngRoute'
]);

// Bootstrap the application and ng-view
angular.element(document).ready(function() {
  angular.element(document.body).attr('ng-view', '');
  angular.bootstrap(document, ['app']);
});
