angular.module('doodly').config(function($stateProvider, $urlRouterProvider) {  

  $stateProvider 
      .state ('simulate', {
        url: '/simulate',
        templateUrl: 'partials/simulate.html',        
        controller : 'SimulatorCtrl'
      })
      $urlRouterProvider.otherwise('/simulate');
});