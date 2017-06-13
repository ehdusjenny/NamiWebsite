/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('FoodController', function($http) {
	var vm = this;
	vm.previousPage = 'Cities';

	function init_map() {
		var geocoder = new google.maps.Geocoder();
		var address = vm.article.address;
		geocoder.geocode({ 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				console.log(results);
			    var myOptions = {
			    	zoom: 14,
			    	center: results[0].geometry.location,
			    	mapTypeId: google.maps.MapTypeId.ROADMAP};
		        map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
		        marker = new google.maps.Marker({
		        	map: map,
		        	position: results[0].geometry.location});
		        infoWindow = new google.maps.InfoWindow({
		        	content:vm.article.title + "<br/>" + vm.article.address});
		        google.maps.event.addListener(marker, "click", function() {
		        	infoWindow.open(map, marker);
		        });
		        infoWindow.open(map, marker);
			}
		}); 
    }

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
	        vm.city = 'Error fetching food cities!';
	    });
	}
	vm.loadCity = loadCity;

	vm.md = "";
    function loadArticle(article) {
    	$http({
			url: '../../md/food/' + article.filename + '.md',
			method: 'GET'
	    }).then(function(response){
	    	vm.article = article;
	        vm.md = response.data;
	        if (vm.cityLoaded) {
	        	vm.previousPage = vm.city.name;
	        	vm.cityLoaded = false;
	        }
	        vm.articleOpen = true;
		    init_map();
	    }, function(error){
	        vm.md = 'Error fetching food article for ' + article.filename + '.md!';
	    });

	}
	vm.loadArticle = loadArticle;

    function goBack() {
    	if (vm.cityLoaded) {
    		vm.cityLoaded = false;
    	}
    	else if (vm.articleOpen) {
    		vm.articleOpen = false;
    		if (vm.previousPage == 'Cities') {
    			vm.cityLoaded = false;
    		}
    		else {
    			vm.cityLoaded = true;
    		}
    	}

	}
	vm.goBack = goBack;
});