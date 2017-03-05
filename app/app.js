angular.module('App', ['ionic'])

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('/tour',{
        url:'/tour',
        templateUrl:'build/pages/tour/tour.html'
      })
      .state('/login',{
        url:'/login',
        templateUrl:'build/pages/login/login.html'
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
