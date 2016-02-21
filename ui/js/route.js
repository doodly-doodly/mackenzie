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
      .state ('demoMenu', {
        url: '/demo',
        templateUrl: 'partials/simulate.html',        
        controller : 'SimulatorCtrl'
      })
      .state ('contactMenu', {
        url: '/contact',
        templateUrl: 'partials/contact-us.html',        
        controller : 'MainCtrl'
      })
      .state ('loginMenu', {
        url: '/login',
        templateUrl: 'partials/login.html',        
        controller : 'LoginCtrl'
      })
      .state ('signupMenu', {
        url: '/signup',
        templateUrl: 'partials/signup.html',        
        controller : 'SignupCtrl'
      })
      .state('register',{
        url : '/register',
        templateUrl : 'partials/registration.html',
        controller : 'SimulatorModalCtrl'
      })
      $urlRouterProvider.otherwise('/home');
});