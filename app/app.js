angular.module('app').config([
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider) {
    // Set up routes
    $routeProvider.otherwise({templateUrl: 'partials/index'});
    $locationProvider.html5Mode(true);
  }
])
.run([
  '$rootScope',
  function($rootScope) {
    $rootScope.title = 'Aang Brunch';
  }
]);
