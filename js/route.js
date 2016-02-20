angular.module('koding').config(function($stateProvider, $urlRouterProvider) {  

  $stateProvider 
      .state ('landing', {
        url: '/landing',
        templateUrl: 'partials/landing.html',
        /*resolve: {
       		currentLocation: function(GeolocationFactory){
        		return GeolocationFactory.getLocation();
         	}
      	},*/
        controller : 'LandingCtrl'
      })
      $urlRouterProvider.otherwise('/landing');
});