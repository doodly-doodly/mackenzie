angular.module('doodly').controller('MainCtrl', ['$scope','$state','$location','MainFactory','$rootScope', function($scope,$state,$location,MainFactory,$rootScope){  
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
    $scope.isloggedIn = MainFactory.getLoggedin();
    $scope.displayedMenus = $scope.menus;

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

    $scope.isDisplayMenu = function(menu){
      var isDisplay = true;
      if(menu.id == 'loginMenu' && MainFactory.getLoggedin()){
        isDisplay = false;
      }/*else if(menu.id == 'sendPackage' && !MainFactory.getLoggedin()){
        isDisplay = false;
      }*/
      return isDisplay;
    }

    $rootScope.$on('loginSuccess',$scope.changedMenus);

    $scope.changedMenus = function(){
      var newMenus =[];
      angular.forEach($scope.menus, function(value) {
        if(!(value.id == 'loginMenu')){
          newMenus.push(value);
        }
      });
      $scope.displayedMenus = newMenus;
      MainFactory.loggedIn(true);
      $scope.isloggedIn = true;      
    }

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


angular.module('doodly').controller('LoginCtrl', ['$scope','DoodlyService','$location','MainFactory','$rootScope', function($scope,DoodlyService,$location,MainFactory,$rootScope){

  $scope.login = function(userid,pwd){
    var loginPromise = DoodlyService.login(userid,pwd);
    loginPromise.then($scope.loginSuccess,$scope.loginError);
  }
  $scope.loginSuccess = function(data){
    MainFactory.loggedIn(true);
    $location.url("/send-package");
    $rootScope.$broadcast('loginSuccess');
  }
  $scope.loginError = function(error){
    MainFactory.loggedIn(true);
    $location.url("/send-package");
    //This will be removed once login api is available.
    $rootScope.$broadcast('loginSuccess');
  }
}]);

angular.module('doodly').controller('SendPckgCtrl', ['$scope','$stateParams','$location','MainFactory', function($scope,$stateParams,$location,MainFactory) {
    $scope.userSelection = {
      userType : '0'
    };
    if(!MainFactory.getLoggedin()){
      $location.url("/login");
    }

}]);

angular.module('doodly').controller('SignUpCtrl', ['$scope','$stateParams', function($scope,$stateParams) {        
    $scope.type = $stateParams.type; 
}]);