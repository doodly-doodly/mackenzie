angular.module('koding').config(function($stateProvider, $urlRouterProvider) {  

  $stateProvider  
      .state ('landing', {
        url: '/landing',
        templateUrl: 'partials/landing.html',
        controller : 'LandingCtrl'
      })

      $urlRouterProvider.otherwise('/landing');
});