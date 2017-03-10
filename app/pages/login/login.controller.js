/**
 * Created by zhoulele on 2017/3/9.
 */
angular.module('loginModule')
  .controller('loginController',function ($scope,$state) {

    $scope.toLogin = function () {
    };

    $scope.toMyHighchart = function () {
      console.log('点击跳转');
      $state.go('highchart');
    };
  });
