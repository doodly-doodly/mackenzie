angular.module('doodly')
.service('SimulatorService', ['$http', function($http){
	this.getDoodlies = function(context){
		return $http({
			method : "POST",			
			url : "/doodly/rest/v1/getdoodlies",			
			//url : "http://10.129.27.63:8090/doodly/rest/v1/getdoodlies",
			data : context			
		});
	}

	this.requestDelivery = function(pkg){
		return $http({
			header : {'Content-Type': 'application/json'},
			method : "POST",			
			url : "/doodly/rest/v1/requestdelivery",			
			//url : "http://10.129.27.63:8090/doodly/rest/v1/requestdelivery",
			data : pkg			
		});
	}

	this.updateStatus = function(context){
		return $http({
			method : "POST",			
			url : "/doodly/rest/v1/updateStatus",			
			//url : "http://10.129.27.63:8090/doodly/rest/v1/getdoodlies",
			data : context			
		});
	}
}]);