/**
 * Created by zhoulele on 2017/2/24.
 */
angular.module('loginModule')
  .controller('tourController', function ($scope, $state) {

    $scope.toLogin = function () {
      $state.go('login');
    };
  });
