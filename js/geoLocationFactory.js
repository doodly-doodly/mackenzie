angular.module('koding').factory('GeolocationFactory', ['$q', '$window',function($q, $window) {

    var geolocationFactory = this;

    geolocationFactory.getCurrentPosition = function(){
        var deferred = $q.defer();

        if(!$window.navigator) {
          deferred.reject(new Error('Geolocation is not supported'));
        } else {
          $window.navigator.geolocation.getCurrentPosition(function(position) {
            deferred.resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          }, deferred.reject);
        }
        return deferred.promise;
    }

    return geolocationFactory;
}]);