angular.module('doodly').factory('MainFactory', [function() {
	var factory = {};
	var loggedIn = false;
	factory.getLoggedin = function(){
		return loggedIn;
	}
	factory.loggedIn = function(val){
		loggedIn = val;
	}

	return factory;
}]);