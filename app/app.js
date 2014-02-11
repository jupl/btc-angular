'use strict';

angular.module('app').config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('index', {
    url: '/',
    templateUrl: 'templates/index.html'
  });

  $urlRouterProvider.otherwise('/');
})
.run(function($rootScope) {
  $rootScope.title = 'Aang Brunch';
});
