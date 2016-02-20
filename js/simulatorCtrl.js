angular.module('doodly').controller('SimulatorCtrl', ['$scope', '$interval', 'uiGmapGoogleMapApi', 'GeolocationFactory', 'SimulatorFactory', function($scope, $interval, uiGmapGoogleMapApi, GeolocationFactory, SimulatorFactory){  
	console.log('Inside LandingCtrl');

	var currentPositionIndex = 0;	
	$scope.polylines = SimulatorFactory.getPolylineInputs();

	$scope.doodlies = SimulatorFactory.getDoodlies();

	GeolocationFactory.getCurrentPosition().then(function (data) {
        console.log(data);
        $scope.map = { center: { latitude: data.lat, longitude: data.lng }, zoom: 15};        
        $scope.markers = SimulatorFactory.getMarkers(data);
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
    	if($scope.markers && $scope.markers.length > 0){
	    	console.log("Moving the points :"+currentPositionIndex);    	
	    	$scope.markers[0].coords.latitude = $scope.polylines[currentPositionIndex].latitude;
	    	$scope.markers[0].coords.longitude = $scope.polylines[currentPositionIndex].longitude;;
	    	currentPositionIndex++;
	    	console.log("Moved the points :"+currentPositionIndex);
    	}
    }

	uiGmapGoogleMapApi.then(function(maps) {
		console.log("Inside Map API");
    });	
}]);
