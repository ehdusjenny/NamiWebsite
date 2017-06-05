/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('FoodController', function($http) {
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
    			return city.articles.sort(function(a, b){return a.created < b.created}).slice(0, 3);
    		}
    	}
    	return null;
    }
	vm.getThreeLatestArticles = getThreeLatestArticles;





	vm.cityLoaded = false;
	function loadCity(cityName) {
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
	    		if (city.name == cityName) {
	    			vm.city = city;
	    			vm.articles = city.articles.sort(function(a, b){return a.created < b.created});
	    			vm.cityLoaded = true;
	    			break;
	    		}
	    	}
	    }, function(error){
	        vm.articles = 'Error fetching food articles for ' + vm.city.name + '!';
	    });
	}
	vm.loadCity = loadCity;






	vm.md = "";
    function loadArticle(filename) {
    	$http({
			url: '../../md/tech/' + filename + '.md', //change tech to food later
			method: 'GET'
	    }).then(function(response){
	        vm.md = response.data;
	        vm.articleOpen = true;
	    }, function(error){
	        vm.md = 'Error retrieving article for ' + filename + '.md!';
	    });

	}
	vm.loadArticle = loadArticle;

	vm.md = "";
    function backToCities() {
    	vm.cityLoaded = false;

	}
	vm.backToCities = backToCities;
});