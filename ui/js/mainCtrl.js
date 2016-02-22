angular.module('doodly').controller('MainCtrl', ['$scope','$state','$location', function($scope,$state,$location){  
	console.log('Inside MainCtrl');
    //TODO
    $scope.menus = [{label: 'Send package',id: "sendPackage",templateUrl:"sendPackage.html",url:'/send-package'},
                    {label: 'Home',id: "homeMenu",templateUrl:"homepage.html",url:'/home'},
                    {label: 'About us',id: "aboutUsMenu",templateUrl:"about-us.html",url:'/about-us'},
                    {label: 'Simulate',id: "simulate",templateUrl:"simulate.html",url:'/simulate'},
                    {label: 'Login',id: "loginMenu",templateUrl:"login.html",url:'/login'},
                    {label:'Become a doodly',id:"signupMenu",templateUrl:"signup.html",url:'/signup/doodly'}];

    $scope.currentMenu = $scope.menus[1];        
    $scope.params = {type:''};

    $scope.getCurrentMenu = function(){
      return $scope.currentMenu;
    }

    $scope.setCurrentMenu = function(menu){
      $scope.currentMenu = menu;
    }

    $scope.getMenuClass = function(menu){
      if(menu.url == $location.path()){
        $scope.currentMenu = menu;
        return 'active';
      }else{
        return '';
      }
    }

    $scope.socialMenus = [{class: 'fa-facebook',id: "fbMenu"},
                      {class: 'fa-twitter',id: "twitterMenu"},
                      {class: 'fa-linkedin',id: "linkedinMenu"},
                      {class: 'fa-dribbble',id: "dribbbleMenu"},
                      {class:'fa-skype', id:"skypeMenu",templateUrl:"blog.html"}];



    $scope.clickMenu = function(menu){
      $scope.setCurrentMenu(menu);
    	$location.url(menu.url);
    }

    $scope.clickSocialMenu = function(id){
      //$state.go(id);
    }

    $scope.signUpUser = function(){
      $location.url("/signup/user");
    }

    $scope.signUpDoodly = function(){
      $location.url("/signup/doodly");
    }

    $scope.readMore = function(){
      window.scrollBy(0,document.body.scrollHeight);
    }

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


angular.module('doodly').controller('LoginCtrl', ['$scope','DoodlyService','$state', function($scope,DoodlyService,$state){

  $scope.login = function(userid,pwd){
    var loginPromise = DoodlyService.login(userid,pwd);
    loginPromise.then($scope.loginSuccess,$scope.loginError);
  }
  $scope.loginSuccess = function(data){
    $state.go('sendPackage');
  }
  $scope.loginError = function(error){
    $state.go('sendPackage');
  }
}]);

angular.module('doodly').controller('SendPckgCtrl', ['$scope','$stateParams', function($scope,$stateParams) {

}]);

angular.module('doodly').controller('SignUpCtrl', ['$scope','$stateParams', function($scope,$stateParams) {        
    $scope.type = $stateParams.type; 
}]);