/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('FoodCityController', function($http, $state, FoodCity, FoodArticle) {
	var vm = this;
	vm.city = FoodCity.getCity();
	vm.cityLoaded = true;

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

	function goToArticle(article) {
        FoodArticle.setArticle(article);
        vm.cityLoaded = false;
        console.log(vm.cityLoaded);
        $state.go("food.article", {"articleName" : article.filename});
    }
    vm.goToArticle = goToArticle;
});