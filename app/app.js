angular.module('app').config([
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider, config) {
    // Set up router
    $routeProvider.otherwise({templateUrl: 'templates/home'});
    $locationProvider.html5Mode(true);
  }
]);
