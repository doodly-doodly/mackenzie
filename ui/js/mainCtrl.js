angular.module('doodly').controller('MainCtrl', ['$scope','$state','$location', function($scope,$state,$location){  
	console.log('Inside MainCtrl');
    //TODO
    $scope.menus = [{label: 'Home',id: "homeMenu",templateUrl:"homepage.html"},
                      {label: 'About Doodly',id: "aboutUsMenu",templateUrl:"about-us.html"},
                      {label: 'Simulate',id: "simulate",templateUrl:"simulate.html"},
                      {label:'Contact',id:"contactMenu",templateUrl:"contact-us.html"},
                      {label: 'Login',id: "loginMenu",templateUrl:"login.html"},
                      {label:'Become a Doodly',id:"signupMenu",templateUrl:"signup.html"}];

    $scope.currentMenu = $scope.menus[0];        


    $scope.getCurrentMenu = function(){
      return $scope.currentMenu;
    }

    $scope.setCurrentMenu = function(menu){
      $scope.currentMenu = menu;
    }

    $scope.getMenuClass = function(menu){
      var obj = $state.current.name;
    }

    $scope.socialMenus = [{class: 'fa-facebook',id: "fbMenu"},
                      {class: 'fa-twitter',id: "twitterMenu"},
                      {class: 'fa-linkedin',id: "linkedinMenu"},
                      {class: 'fa-dribbble',id: "dribbbleMenu"},
                      {class:'fa-skype', id:"skypeMenu",templateUrl:"blog.html"}];



    $scope.clickMenu = function(menu){
      $scope.setCurrentMenu(menu);
    	$state.go(menu.id);
    }

    $scope.clickSocialMenu = function(id){
      //$state.go(id);
    }

    $scope.signUpUser = function(){
      $state.go("register");
    }

    $scope.signUpDoodly = function(){
      $state.go("signupMenu");
    }

    $scope.loginBgImage = {
        //background: 'url(images/delivery-boy.png)'
    };

    if($location.$$url.indexOf('about-us') > -1){
      $scope.currentMenu = $scope.menus[1];
    }else if($location.$$url.indexOf('signup') > -1){
      $scope.currentMenu = $scope.menus[5];
    }else if($location.$$url.indexOf('simulate') > -1){
      $scope.currentMenu = $scope.menus[2];
    }else if($location.$$url.indexOf('contact') > -1){
      $scope.currentMenu = $scope.menus[3];
    }else if($location.$$url.indexOf('login') > -1){
      $scope.currentMenu = $scope.menus[4];
    } 
}]);


angular.module('doodly').controller('LoginCtrl', ['$scope','DoodlyService', function($scope,DoodlyService){

  $scope.login = function(userId,pwd){
    var loginPromise = DoodlyService.login(userid,pwd);
    loginPromise.then($scope.loginSuccess,$scope.loginError);
  }
  $scope.loginSuccess = function(data){

  }
  $scope.loginError = function(error){

  }
}]);



angular.module('doodly').controller('SignupCtrl', ['$scope', function($scope){

}]);