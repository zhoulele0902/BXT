//登录模块
var loginModule = angular.module('loginModule',[]);
var lbxModule = angular.module('lbxModule',[]);
var utilsModule = angular.module('utilsModule',[]);

var app = angular.module('App', [
  'ionic',
  'ngCordova',
  'baseConfig',
  'serviceModule',
  'utilsModule',
  'loginModule',
  'lbxModule',
  'highcharts-ng'
])

  .config(function ($stateProvider, $urlRouterProvider,baseConfig) {
    $stateProvider
      .state('tour',{
        url:'/tour',
        templateUrl:'build/pages/tour/tour.html',
        controller: 'tourController',
      })
      .state('login',{
        url:'/login',
        templateUrl:'build/pages/login/login.html',
        controller:'loginController'
      })
      .state('highchart',{
        url:'/highchart',
        templateUrl:'build/pages/highchart/highchart.html',
        controller:'highchartController'
      })

    $urlRouterProvider.otherwise('/tour');
  })

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
