angular.module('doodly').service('DoodlyService', ['$http', function($http){
  this.login = function(userid,pwd){
    var context = {userId:userid,password:pwd};
    return $http({
      method : "POST",
      url : "/doodly/rest/v1/login",
      data : context      
    });
  }
}]);