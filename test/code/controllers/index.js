'use strict';

describe('Index controller', function() {
  var $scope;
  var index;

  beforeEach(function() {
    module('app.controllers');
    inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      index = $controller('Index', {
        $scope: $scope
      });
    });
  });

  it('', function() {

  });
});
