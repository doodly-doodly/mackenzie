angular.module('doodly').factory('SimulatorFactory', ['$q', '$window',function($q, $window) {

    var simulatorFactory = this;

    var stokeColors = ['#ff7373', '#bd00ff', '#8470ff', '#c2eca2', '#8dff35', '#ff9b35', '#ff6d6d', '#009a82', '#c39797', '#00ff7f', '#8b7765'];

    var clickedLocacation = {
      lat : 0,
      lng : 0,
      locationName : "Bangalore"
    }

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
      var num = Math.floor(Math.random() * 10 + 1);
      return stokeColors[num];       
    }

    simulatorFactory.getStokeColor = function(){
      var num = Math.floor(Math.random() * 10 + 1);
      return stokeColors[num];        
    }

    simulatorFactory.getPolylines = function(doodlies){
      var allPolyLines = [];
      if(doodlies){
        var counter = 0;
        angular.forEach(doodlies, function(doodly){     
          var polyLine = {}       
          if(doodly.doodlyType == 'MOVING'){                
            var geoJsonString = doodly.pathPolyLine;
            if(!geoJsonString){
              //geoJsonString = 'awcnAeqtxMjBsFy@Yo@vAqAxDOh@G^APDP_G`CuBv@mDvAgDjAyAf@GD_AbBw@`BUdIIXWVo@FaD[eGa@_AGqC]WEr@kEvCeQ|@kG';
              console.log("geoJsonString not available")              
            } else{
              polyLine.path = getPositions(polyline.decode(geoJsonString));
              polyLine.stoke =  {
                color : simulatorFactory.getStokeColor()
              }                              
              allPolyLines.push(polyLine);
              counter ++;  
            }            
          }           
        });        
      }
      return allPolyLines;
    }


    simulatorFactory.getPolylinesForDoodly = function(doodly){
      var allPolyLines = [];                    
      var geoJsonString = doodly.polyLine;
      if(!geoJsonString){
        geoJsonString = 'awcnAeqtxMjBsFy@Yo@vAqAxDOh@G^APDP_G`CuBv@mDvAgDjAyAf@GD_AbBw@`BUdIIXWVo@FaD[eGa@_AGqC]WEr@kEvCeQ|@kG';
        console.log("geoJsonString not available")
        return allPolyLines;
      }
      return getPositions(polyline.decode(geoJsonString));                           
    }

    simulatorFactory.getMarkers = function(doodlies){
      var allMarkers = [];
      if(doodlies){
        angular.forEach(doodlies, function(doodly){  
          var marker = {};          
          marker.id = doodly.doodlyId;
          marker.type = doodly.doodlyType;
          marker.positionIndex = 0;
          marker.coords = {
            latitude: doodly.currLocation.lat,
            longitude: doodly.currLocation.lon
          }
          marker.option = {
            icon : {
              url: (doodly.doodlyType == 'MOVING'? 'images/doodlynew.png' : 'images/joint.png'),
              /*animation: google.maps.Animation.DROP,*/
              scaledSize: new google.maps.Size(28, 34)
            }            
          }
          marker.polyLines = simulatorFactory.getPolylinesForDoodly(doodly);
          allMarkers.push(marker);         
        });        
      }
      return allMarkers;
    }

    simulatorFactory.setClickedLocation = function(lat, lng, locationName){
      clickedLocacation.lat = lat;
      clickedLocacation.lng = lng;
      clickedLocacation.locationName = locationName;
    }

    simulatorFactory.getClickedLocation = function(lat, lng, locationName){
      return clickedLocacation;
    }

    return simulatorFactory;
}]);