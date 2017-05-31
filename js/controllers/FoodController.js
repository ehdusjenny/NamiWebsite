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
	vm.articleOpen = false;
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

    function getThreeLatestArticles(city_name) {
        console.log(vm.cities[0]);
    	for (i = 0; i < vm.cities.length; i++) {
    		city = vm.cities[i]
    		if (city.name == city_name) {
    			return city.articles.sort(function(a, b){return a.created < b.created}).slice(0, 2);
    		}
    	}
    	return null;
    }

	vm.getThreeLatestArticles = getThreeLatestArticles

    vm.md = "";
    function loadArticle(filename) {
    	$http({
			url: '../../md/food/' + filename + '.md',
			method: 'GET'
	    }).then(function(response){
	        vm.md = response.data;
	        vm.articleOpen = true;
	    }, function(error){
	        vm.md = 'Error retrieving article for ' + filename + '.md!';
	    });

	}
	vm.loadArticle = loadArticle;

	function backToOverview() {
	    vm.articleOpen = false;
	}
	vm.backToOverview = backToOverview;
});