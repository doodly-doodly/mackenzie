angular.module('doodly').controller('SimulatorCtrl', ['$scope', '$interval', 'uiGmapGoogleMapApi', 'GeolocationFactory', 'SimulatorFactory', 'SimulatorService', function($scope, $interval, uiGmapGoogleMapApi, GeolocationFactory, SimulatorFactory, SimulatorService){  
	console.log('Inside LandingCtrl');

	var currentPositionIndex = 0;			

	/*GeolocationFactory.getCurrentPosition().then(function (data) {
        console.log(data); 
    });*/
	

	SimulatorService.getDoodlies().then(
			function(result){
				if(result){                            
					console.log("Output Data :"+result);
					$scope.doodlies = result.data;
					$scope.map = { center: {latitude: 12.970994, longitude: 77.604815}, zoom: 15};   					  
					$scope.allPolylines = SimulatorFactory.getPolylines(result.data);
					$scope.allMarkers = SimulatorFactory.getMarkers(result.data);
	          	}   
			}
		);	

    /*$scope.options = {
    	icon: {
            url: 'images/doodly.png',
            animation: google.maps.Animation.DROP,
            scaledSize: new google.maps.Size(34, 44)
        }    	
	};	*/

    $interval(moveThePoints, 3000)

    function moveThePoints(){
    	if($scope.allMarkers && $scope.allMarkers.length > 0){
	    	console.log("Moving the points :"+currentPositionIndex);  
	    	angular.forEach($scope.allMarkers, function(marker){            
	          if(marker.type == 'moving'){                
	        	marker.coords.latitude = marker.polyLines[currentPositionIndex].latitude;
	    		marker.coords.longitude = marker.polyLines[currentPositionIndex].longitude;                                    	
	          }           
        	});   		    	
	    	currentPositionIndex++;
	    	console.log("Moved the points :"+currentPositionIndex);
    	}
    }

	uiGmapGoogleMapApi.then(function(maps) {
		console.log("Inside Map API");
    });	
}]);