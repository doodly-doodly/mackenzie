angular.module('doodly')
.service('SimulatorService', ['$http', function($http){
	this.getDoodlies = function(context){
		return $http({
			method : "POST",
			url : "http://10.129.27.183:8090/doodly/rest/v1/getdoodlies",
			//url : "/doodly/rest/v1/getdoodlies",
			data : context			
		});
	}
}]);