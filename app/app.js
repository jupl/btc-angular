angular.module('app').config(function($routeProvider, $locationProvider) {
  // Set up routes
  $routeProvider.when('/', {templateUrl: 'templates/index.html'});
  $routeProvider.otherwise('/');
  $locationProvider.html5Mode(true);
})
.run(function($rootScope) {
  $rootScope.title = 'Aang Brunch';
});
