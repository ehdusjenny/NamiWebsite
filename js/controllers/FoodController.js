/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('FoodController', function($http, $state, FoodCity) {
	var vm = this;

	/*
	 * articles.json has a list of cities.
	 * Each city has a name, region, country, and a list of articles with title, filename, synopsis, created, and tags.
	 */
	$http({
			url: '../../md/food/articles.json',
			method: 'GET',
			headers: {
   				'Content-Type': "application/json"
 			}
    }).then(function(response){
        vm.cities = response.data.cities;
    }, function(error){
        vm.cities = 'Error getting food articles!';
    });

    function getThreeLatestArticles(cityName) {
    	for (i = 0; i < vm.cities.length; i++) {
    		city = vm.cities[i]
    		if (city.name == cityName) {
    			var sorted = city.articles.sort(function(a, b){
    				if (a.created.toLowerCase().localeCompare(b.created.toLowerCase()) == 0) {
    					return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    				}
    				else return a.created.localeCompare(b.created);
    			});
    			console.log(sorted);
    			return sorted.slice(0, 3);
    		}
    	}
    	return null;
    }

	vm.getThreeLatestArticles = getThreeLatestArticles;

	function goToCity(city) {
		FoodCity.setCity(city);
		console.log(FoodCity.getCity());
		$state.go("food.city", {"cityName" : city.name});
	}
	vm.goToCity = goToCity;
});