angular.module('koding').controller('LandingCtrl', ['$scope', '$interval', 'uiGmapGoogleMapApi', 'GeolocationFactory', function($scope, $interval, uiGmapGoogleMapApi, GeolocationFactory){  
	console.log('Inside LandingCtrl');

	GeolocationFactory.getCurrentPosition().then(function (data) {
        console.log(data);
        $scope.map = { center: { latitude: data.lat, longitude: data.lng }, zoom: 16};        
        $scope.markers = [
        	{  		
        		id: 0,	  
	  			coords: {	
	      			latitude: data.lat,
	      			longitude: data.lng
	  			}
			},
			{  		
        		id: 1,	  
	  			coords: {	
	      			latitude: data.lat + 0.001,
	      			longitude: data.lng + 0.001
	  			}
			},
			{  		
        		id: 2,	  
	  			coords: {	
	      			latitude: data.lat - 0.001,
	      			longitude: data.lng - 0.001 
	  			}
			}			
		];
    });

    $interval(moveThePoints, 3000)

    function moveThePoints(){
    	console.log("Moving the points");
    	$scope.markers[1].coords.latitude = $scope.markers[1].coords.latitude + 0.0001;
    	$scope.markers[1].coords.longitude = $scope.markers[1].coords.longitude + 0.0001;
    	console.log("Moved the points");
    }

	uiGmapGoogleMapApi.then(function(maps) {
		console.log("Inside Map API");
    });	
}]);
