angular.module('app').config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  // Use HTML5 push history
  $locationProvider.html5Mode(false);

  // Set up routes
  $stateProvider.state('index', {
    url: '/',
    templateUrl: 'templates/index.html'
  });

  // Set up default route
  $urlRouterProvider.otherwise('/');
})
.run(function($rootScope) {
  $rootScope.title = 'Aang Brunch';
});
