angular.module('doodly').controller('LandingCtrl', ['$scope', '$interval', 'uiGmapGoogleMapApi', 'GeolocationFactory', function($scope, $interval, uiGmapGoogleMapApi, GeolocationFactory){  
	console.log('Inside LandingCtrl');

	var currentPositionIndex = 0;
	var positions = polyline.decode('awcnAeqtxMjBsFy@Yo@vAqAxDOh@G^APDP_G`CuBv@mDvAgDjAyAf@GD_AbBw@`BUdIIXWVo@FaD[eGa@_AGqC]WEr@kEvCeQ|@kG');
	
	$scope.polylines = getPolylineInputs(positions);

	function getPolylineInputs(positions){
		var points = [];
		for(var i=0; i<positions.length; i++){
			var pos = positions[i];
			var point = {				 
				"latitude" : pos[0],
				"longitude" : pos[1]
			}
			points.push(point);
		}
		return points;
	}
	$scope.polyline = 'awcnAeqtxMjBsFy@Yo@vAqAxDOh@G^APDP_G`CuBv@mDvAgDjAyAf@GD_AbBw@`BUdIIXWVo@FaD[eGa@_AGqC]WEr@kEvCeQ|@kG';
	console.log(positions);

	GeolocationFactory.getCurrentPosition().then(function (data) {
        console.log(data);
        $scope.map = { center: { latitude: data.lat, longitude: data.lng }, zoom: 15};        
        $scope.markers = [
        	{  		
        		id: 0,	  
	  			coords: {	
	      			latitude: data.lat,
	      			longitude: data.lng
	  			}
			}/*,
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
			}*/			
		];
    });

    $scope.options = {
    	icon: {
            url: 'images/doodly.png',
            animation: google.maps.Animation.DROP,
            scaledSize: new google.maps.Size(34, 44)
        }    	
	};	

    $interval(moveThePoints, 3000)

    function moveThePoints(){
    	console.log("Moving the points :"+currentPositionIndex);    	
    	$scope.markers[0].coords.latitude = $scope.polylines[currentPositionIndex].latitude;
    	$scope.markers[0].coords.longitude = $scope.polylines[currentPositionIndex].longitude;;
    	currentPositionIndex++;
    	console.log("Moved the points :"+currentPositionIndex);
    }

	uiGmapGoogleMapApi.then(function(maps) {
		console.log("Inside Map API");
    });	
}]);
