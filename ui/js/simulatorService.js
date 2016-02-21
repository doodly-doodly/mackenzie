angular.module('doodly')
.service('SimulatorService', ['$http', function($http){
	this.getDoodlies = function(context){
		return $http({
			method : "POST",
			url : "/doodly/rest/v1/getdoodlies",
			//url : "/doodly/rest/v1/getdoodlies",
			data : context			
		});
	}
}]);