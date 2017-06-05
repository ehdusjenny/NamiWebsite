angular.module('namiworld')
.controller('FoodCityController', function($http, $stateParams) {
	var vm = this;

	vm.cityName = $stateParams.cityName;

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
        cities = response.data.cities;
    	for (i = 0; i < cities.length; i++) {
    		city = cities[i];
    		if (city.name == cityName) {
    			vm.city = city;
    			console.log(vm.city.image);
    			vm.articles = city.articles.sort(function(a, b){return a.created < b.created});
    			break;
    		}
    	}
    	return null;
    }, function(error){
        vm.articles = 'Error fetching food articles for ' + cityName + '!';
    });

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
});