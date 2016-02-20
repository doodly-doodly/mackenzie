angular.module('doodly').factory('SimulatorFactory', ['$q', '$window',function($q, $window) {

    var simulatorFactory = this;

    var stokeColors = ['#ff7373', '#bd00ff'];

    function getPositions(positions){
      var polyLines = [];
      for(var i=0; i<positions.length; i++){
        var pos = positions[i];
        var point = {        
          "latitude" : pos[0],
          "longitude" : pos[1]
        }
        polyLines.push(point);
      }
      return polyLines;
    }

    function getStokeColor(counter){
      if(counter%2 == 0){
        return stokeColors[0];
      }
      return stokeColors[1];       
    }

    simulatorFactory.getPolylines = function(doodlies){
      var allPolyLines = [];
      if(doodlies){
        var counter = 0;
        angular.forEach(doodlies, function(doodly){     
          var polyLine = {}       
          if(doodly.type == 'moving'){                
            var geoJsonString = doodly.pathPolyLine;
            if(!geoJsonString){
              geoJsonString = 'awcnAeqtxMjBsFy@Yo@vAqAxDOh@G^APDP_G`CuBv@mDvAgDjAyAf@GD_AbBw@`BUdIIXWVo@FaD[eGa@_AGqC]WEr@kEvCeQ|@kG';
            }
            polyLine.path = getPositions(polyline.decode(geoJsonString));
            polyLine.stoke =  {
              color : getStokeColor(counter)
            }                  
            //allPolyLines.push(getPositions(polyline.decode(geoJsonString)))                                 
            allPolyLines.push(polyLine);
            counter ++;
          }           
        });        
      }
      return allPolyLines;
    }


    simulatorFactory.getPolylinesForDoodly = function(doodly){
      var allPolyLines = [];                    
      var geoJsonString = doodly.pathPolyLine;
      if(!geoJsonString){
        geoJsonString = 'awcnAeqtxMjBsFy@Yo@vAqAxDOh@G^APDP_G`CuBv@mDvAgDjAyAf@GD_AbBw@`BUdIIXWVo@FaD[eGa@_AGqC]WEr@kEvCeQ|@kG';
      }
      return getPositions(polyline.decode(geoJsonString));                           
    }

    simulatorFactory.getMarkers = function(doodlies){
      var allMarkers = [];
      if(doodlies){
        angular.forEach(doodlies, function(doodly){  
          var marker = {};          
          marker.id = doodly.id;
          marker.type = doodly.type;
          marker.coords = {
            latitude: doodly.currentPosition.lat,
            longitude: doodly.currentPosition.lng
          }
          marker.option = {
            icon : {
              url: (doodly.type == 'moving'? 'images/doodly.png' : 'images/joint.png'),
              animation: google.maps.Animation.DROP,
              scaledSize: new google.maps.Size(34, 44)
            }            
          }
          marker.polyLines = simulatorFactory.getPolylinesForDoodly(doodly);
          allMarkers.push(marker);         
        });        
      }
      return allMarkers;
    }
   
    return simulatorFactory;
}]);