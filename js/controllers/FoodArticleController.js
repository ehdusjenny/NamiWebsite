/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('FoodArticleController', function($http, $scope, $state, $timeout, FoodArticle) {
	var vm = this;


	var url = window.location.href;
	var filename = url.substring(url.lastIndexOf("/") + 1, url.length);
	vm.article = FoodArticle.getArticle();
	//in case of refresh
	if (!vm.article) {
		$http({
			url: '../../md/food/articles.json',
			method: 'GET',
			headers: {
   				'Content-Type': "application/json"
 			}
	    }).then(function(response){
	        vm.cities = response.data.cities;
	        for (var j = 0; j < vm.cities.length; j++) {
		        for (var i = 0; i < vm.cities[j].articles.length; i++) {
		        	if (vm.cities[j].articles[i].filename == filename) {
		        		vm.article = vm.cities[j].articles[i];
		        		console.log(vm.article);
		        		break;
		        	}
		        }
		    }
		    loadArticle();
	    }, function(error){
	        vm.article = 'Error getting article titles!';
	    });
	}
	else {
		loadArticle();
	}

	vm.md = "";
    function loadArticle() {
		vm.articleOpen = true;
    	$http({
			url: '../../md/food/' + vm.article.filename + '.md',
			method: 'GET'
	    }).then(function(response){
	        vm.md = response.data;
		    init_map();
	    }, function(error){
	        vm.md = 'Error fetching food article for ' + vm.article.filename + '.md!';
	    });

	}

	function init_map() {
		var address = vm.article.address;
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
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


	// function goBack() {
 //        vm.articleOpen = false;
 //        $timeout(function() {
 //        	$state.go("food");
 //        }, 1000);
	// }
	// vm.goBack = goBack;

	$scope.$on('$destroy', function() {
		vm.articleOpen = false;
    });
});