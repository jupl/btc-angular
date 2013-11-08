angular.module('app').config([
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider, config) {
    // Set up router
    $routeProvider.otherwise({templateUrl: 'partials/index'});
    $locationProvider.html5Mode(true);
  }
]);
