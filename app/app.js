'use strict';

angular.module('app').config(function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/', {
    templateUrl: 'templates/index.html'
  })
  .otherwise('/');
});
