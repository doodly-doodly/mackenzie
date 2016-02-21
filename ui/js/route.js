angular.module('doodly').config(function($stateProvider, $urlRouterProvider) {  

  $stateProvider 
      .state ('simulate', {
        url: '/simulate',
        templateUrl: 'partials/simulate.html',        
        controller : 'SimulatorCtrl'
      })
      .state ('homeMenu', {
        url: '/home',
        templateUrl: 'partials/homepage.html',        
        controller : 'MainCtrl'
      })
      .state ('aboutUsMenu', {
        url: '/about-us',
        templateUrl: 'partials/about-us.html',        
        controller : 'MainCtrl'
      })
      .state ('servicesMenu', {
        url: '/services',
        templateUrl: 'partials/services.html',        
        controller : 'MainCtrl'
      })
      .state ('contactMenu', {
        url: '/contact',
        templateUrl: 'partials/contact-us.html',        
        controller : 'MainCtrl'
      })
      .state ('loginMenu', {
        url: '/login',
        templateUrl: 'partials/login.html',        
        controller : 'MainCtrl'
      })
      .state ('signupMenu', {
        url: '/signup',
        templateUrl: 'partials/signup.html',        
        controller : 'MainCtrl'
      })
      $urlRouterProvider.otherwise('/home');
});