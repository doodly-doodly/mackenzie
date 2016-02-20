angular.module('doodly').factory('SimulatorFactory', ['$q', '$window', 'SimulatorService', function($q, $window, SimulatorService) {

    var simulatorFactory = this;

    simulatorFactory.getPolylineInputs = function(geoJsonString){
      if(!geoJsonString){
        geoJsonString = 'awcnAeqtxMjBsFy@Yo@vAqAxDOh@G^APDP_G`CuBv@mDvAgDjAyAf@GD_AbBw@`BUdIIXWVo@FaD[eGa@_AGqC]WEr@kEvCeQ|@kG';
      }

      var positions = polyline.decode(geoJsonString);
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

    simulatorFactory.getMarkers = function(data){
      var markers = [
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
      return markers;
    }

    simulatorFactory.getDoodlies = function(){
      console.log("Output from webservice :"+SimulatorService.getDoodlies());
    }
    return simulatorFactory;
}]);