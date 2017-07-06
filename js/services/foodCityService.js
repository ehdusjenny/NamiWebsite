angular.module('namiworld')
.service('FoodCity', function() {
  var city;

  var getCity = function() {
      return city;
  };

  var setCity = function(cityObject){
      city = cityObject;
  };

  return {
    getCity: getCity,
    setCity: setCity
  };

});