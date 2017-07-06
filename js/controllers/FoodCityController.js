/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('FoodCityController', function($http, FoodCity) {
	var vm = this;
	vm.city = FoodCity.getCity();

	function loadCity() {
		$http({
			url: '../../md/food/articles.json',
			method: 'GET',
			headers: {
   				'Content-Type': "application/json"
 			}
	    }).then(function(response){
	        cities = response.data.cities;
	    	for (i = 0; i < cities.length; i++) {
	    		city = cities[i];
	    		if (city.name == vm.city.name) {
	    			vm.city = city;
	    			vm.articles = city.articles.sort(function(a, b){return a.created < b.created});
	    			break;
	    		}
	    	}
	    }, function(error){
	        vm.city = 'Error fetching food cities!';
	    });
	}
	loadCity();
});