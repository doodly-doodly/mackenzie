angular.module('doodly').controller('SimulatorCtrl', ['$scope', '$interval', '$timeout', '$modal', 'uiGmapGoogleMapApi', 'GeolocationFactory', 'SimulatorFactory', 'SimulatorService', 
		function($scope, $interval, $timeout, $modal, uiGmapGoogleMapApi, GeolocationFactory, SimulatorFactory, SimulatorService){  
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
					 		  handleMapClick(args);
					 	}
					 }
					};   					  					
					$scope.allMarkers = SimulatorFactory.getMarkers(result.data);
					$scope.allPolylines = SimulatorFactory.getPolylines(result.data);
	          	}   
			}
		);	

	function handleMapClick(args){
		var e = args[0];
		var lat = e.latLng.lat(),lon = e.latLng.lng();
		SimulatorFactory.setClickedLocation(lat, lon);

 		console.log("lat :"+lat+" lon :"+lon);
 		var marker = { id: Date.now(), type : 'MOVING', coords: {
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
				createPackage(userSelection);               					
				$scope.allMarkers.push(marker);
			}                
		}, function () {                			
		});     
	}


	function createPackage(userSelection){
		SimulatorService.requestDelivery(/*createPackageObject(userSelection)*/).then(
			function(result){
				if(result){                            
					console.log("Output Data :"+result);		
					var assignedJointId = result.data;											
					angular.forEach($scope.allMarkers, function(marker){              
	            		if(marker.id == assignedJointId){
	            			marker.option.animation = google.maps.Animation.BOUNCE;	              			
	            			$timeout(function(){        						
        						addThisMarker(marker)
        					}, 4000)        					              			
	            		}    	            		           
        			});
	          	}   
			}
		);	
	}

	function addThisMarker(assignedMarker){
		assignedMarker.option.animation = null;		
	}

	function createPackageObject(userSelection){
		var pack = {			
			consumerId: 'jany',
			packageType: userSelection.pType,
			size: 'small',
			packageDescription: 'My package',
			status: 'waiting_for_pickup',
			pickupLocation:{
				name: userSelection.src,
				mobile: '212121',
				address: userSelection.src,
				geoLocation: {
					lat: userSelection.srcLat,
					lon: userSelection.srcLng
				}
			}, 
			dropLocation:{
				name: userSelection.dest,
				mobile: userSelection.deliveryPhone,
				address: userSelection.address,
				geoLocation: {
					lat: userSelection.destLat,
					lon: userSelection.destLng
				}
			}
		}
		return pack;
	}

    $interval(moveThePoints, 3000)

    function moveThePoints(){
    	if($scope.allMarkers && $scope.allMarkers.length > 0){
	    	console.log("Moving the points :"+currentPositionIndex);  
	    	angular.forEach($scope.allMarkers, function(marker){            
	          if(marker.type == 'MOVING' && marker.polyLines && marker.polyLines.length > currentPositionIndex){                
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
        $scope.userSelection.srcLat = clickedLocation.lat;
        $scope.userSelection.srcLng = clickedLocation.lng;
        var events = {
    		places_changed: function (searchBox) {
        		var places = searchBox.getPlaces();
        		if(places && places.length > 0){         			
        			$scope.userSelection.dest = places[0].formatted_address;			
        			$scope.userSelection.destLat = places[0].geometry.location.lat();
        			$scope.userSelection.destLng = places[0].geometry.location.lng();
        		}        			
        	}
    	}
    	
        $scope.searchbox = { template: 'partials/searchTemplate.html', events: events, parentdiv : 'destDiv' };

        $scope.newMap = { center: {latitude: 12.970994, longitude: 77.604815},
			zoom: 15 			
		};

        $scope.applySelectedInputs = function () {          	
        	$modalInstance.close($scope.userSelection);
        };

        $scope.closeSelector = function () {
            $modalInstance.dismiss('cancel');
        };

      /*  function keyPress(){
        	var autocompleteService = new google.maps.places.AutocompleteService();
        	autocompleteService.getPlacePredictions({input: 'Ban'}, function(predictions, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log(predictions);
                }
            });
        }

        google.maps.event.addDomListener(window, 'load', initSearch);

        var autocompleteService = new google.maps.places.AutocompleteService();
       // var autocomplete = new google.maps.places.Autocomplete(input);

		$scope.getPredictions = function(query){			

			if(query && query.length > 3){
				var searchObj = {
	        		input: query
    			};

	    		autocompleteService.getPlacePredictions(searchObj, function(predictions, status) {
	    			console.log("Place name is:"+predictions[0].getPlace());
	            	$scope.response = predictions;                
	    		});
			}			
		}
        

        function initSearch() {
			var input = document.getElementById('searchTextField');
			input.on('keydown', function() {
    			keyPress();
			});
			var autocomplete = new google.maps.places.Autocomplete(input);
			google.maps.event.addListener(autocomplete, 'place_changed', function() {
    			//fillInAddress();
    			console.log("Inside");
  			});
		}*/


}]);