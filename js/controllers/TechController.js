/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('TechController', function($http) {

	var vm = this;

	/*
	 * articles.json has a list of articles,
	 * and each article has a title, filename, tags, and created properties.
	 */
	vm.articleOpen = false;
	$http({
			url: '../../md/tech/articles.json',
			method: 'GET',
			headers: {
   				'Content-Type': "application/json"
 			}
    }).then(function(response){
        vm.articles = response.data.articles;
    }, function(error){
        vm.articles = 'Error getting article titles!';
    });

    vm.md = "";
    function loadArticle(filename) {
    	$http({
			url: '../../md/tech/' + filename + '.md',
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

	// like on oceana.im, fade in and bring up more as you scroll down.
	// Same for Food and Music.

	
});