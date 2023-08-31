(function () {
'use strict';

angular.module('myFirstApp', [])

.controller('MyFirstController', function ($scope) {
  $scope.name = "Carlos";
  $scope.sayHello = function () {
    return "Hello Coursera!";
  };
});

})();
