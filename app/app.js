angular.module('app').config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    // Set up routes
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('index', {
      url: '/',
      templateUrl: 'partials/index'
    });

    $locationProvider.html5Mode(true);
  }
])
.run([
  '$rootScope',
  function($rootScope) {
    $rootScope.title = 'Aang Brunch';
  }
]);
