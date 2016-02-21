angular.module('doodly').controller('SimulatorCtrl', ['$scope', '$interval', '$modal', 'uiGmapGoogleMapApi', 'GeolocationFactory', 'SimulatorFactory', 'SimulatorService', 
		function($scope, $interval, $modal, uiGmapGoogleMapApi, GeolocationFactory, SimulatorFactory, SimulatorService){  
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
					$scope.map = { center: {latitude: 12.970994, longitude: 77.604815},
					 zoom: 15, 
					 events: {
					 	click: function (maps, eventName, args) {
					 		var e = args[0];
                			var lat = e.latLng.lat(),lon = e.latLng.lng();
                			SimulatorFactory.setClickedLocation(lat, lon);

					 		console.log("lat :"+lat+" lon :"+lon);
					 		var marker = {
			                    id: Date.now(),
			                    type : 'MOVING',
			                    coords: {
			                        latitude: lat,
			                        longitude: lon
			                    },
			                    option : {
            						icon : {
              							url: 'images/doodlynew.png',
              							animation: google.maps.Animation.DROP,
              							scaledSize: new google.maps.Size(34, 34)
            						}            
          						}
                			};
                			var modalInstance = $modal.open({
                				templateUrl: 'partials/registration.html',
                				controller: 'SimulatorModalCtrl',
                				backdrop: 'static',
                				keyboard: false
            				});         
            				modalInstance.result.then(function (userSelection) {              
                				console.log('userSelection :' + userSelection);
                				if(userSelection){     
                					if(userSelection.userType == 0){
                						marker.type = 'package';  	                				
	                					marker.option.icon.url = 'images/package.png';	                						                    				
                					} else if(userSelection.userType == 2){
                						marker.type = 'joint';  	                				
	                					marker.option.icon.url = 'images/joint.png';
                					}               					
                    				$scope.allMarkers.push(marker);
                				}                
            				}, function () {                			
            				});                			
					 	}
					 }
					};   					  
					$scope.allPolylines = SimulatorFactory.getPolylines(result.data);
					$scope.allMarkers = SimulatorFactory.getMarkers(result.data);
	          	}   
			}
		);	

    $interval(moveThePoints, 3000)

    function moveThePoints(){
    	if($scope.allMarkers && $scope.allMarkers.length > 0){
	    	console.log("Moving the points :"+currentPositionIndex);  
	    	angular.forEach($scope.allMarkers, function(marker){            
	          if(marker.type == 'MOVING'){                
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


angular.module('doodly').controller('SimulatorModalCtrl', ['$scope', '$modalInstance', 'SimulatorFactory', function($scope, $modalInstance, SimulatorFactory) {        
        
        $scope.modalHeader = "What you want to do?";
        $scope.userSelection = {
        	userType : '0'
        }; 

        var clickedLocation = SimulatorFactory.getClickedLocation();

        var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(clickedLocation.lat, clickedLocation.lng);
			
		geocoder.geocode({ 'latLng': latlng }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
    			if (results[1]) {
        			console.log(results[1].formatted_address); // details address        			
        			 $scope.userSelection.src = results[1].formatted_address;
    			} else {
        			console.log('Location not found');
    			}
			} else {
    			console.log('Geocoder failed due to: ' + status);
			}
    	});               

        $scope.userSelection.src = clickedLocation.locationName;
        var events = {
    		places_changed: function (searchBox) {
        		var place = searchBox.getPlaces();
        		if (!place || place == 'undefined' || place.length == 0) {
            		console.log('no place data :(');
            		return;
        		}
    		}
    	}
        $scope.searchbox = { template: 'partials/searchTemplate.html', events: events, parentdiv : 'destDiv' };

        $scope.applySelectedInputs = function () {          	
        	$modalInstance.close($scope.userSelection);
        };

        $scope.closeSelector = function () {
            $modalInstance.dismiss('cancel');
        };

}]);