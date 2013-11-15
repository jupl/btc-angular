angular.module('app').config(function($routeProvider, $locationProvider) {
  // Set up routes
  $routeProvider.when('/', {templateUrl: 'templates/index.html'});
  $routeProvider.otherwise('/');
  $locationProvider.html5Mode(false);
})
.run(function($rootScope) {
  $rootScope.title = 'Aang Brunch';
});
