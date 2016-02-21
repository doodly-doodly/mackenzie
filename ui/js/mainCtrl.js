angular.module('doodly').controller('MainCtrl', ['$scope','$state','$location', function($scope,$state,$location){  
	console.log('Inside MainCtrl');
    //TODO
    $scope.menus = [{label: 'Home',id: "homeMenu",templateUrl:"homepage.html"},
                      {label: 'About Us',id: "aboutUsMenu",templateUrl:"about-us.html"},
                      {label: 'Services',id: "servicesMenu",templateUrl:"services.html"},
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

    $scope.signUp = function(){
      $state.go("signupMenu");
    }

    $scope.loginBgImage = {
        //background: 'url(images/delivery-boy.png)'
    };
}]);
