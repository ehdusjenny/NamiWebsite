/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('FoodArticleController', function($http) {
	var vm = this;

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

	vm.md = "";
    function loadArticle() {
    	$http({
			url: '../../md/food/' + article.filename + '.md',
			method: 'GET'
	    }).then(function(response){
	        vm.md = response.data;
		    init_map();
	    }, function(error){
	        vm.md = 'Error fetching food article for ' + article.filename + '.md!';
	    });

	}
	loadArticle();
});