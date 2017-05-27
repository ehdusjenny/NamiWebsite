/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('TechController', function($http) {

	var vm = this;

	vm.articleOpen = false;

	/*
	 * articles.json has title, filename, tags,
	 * and created properties for each article.
	 */

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

	function backToOverview() {
		return true;
	}

	vm.backToOverview = backToOverview;

	vm.loadArticle = loadArticle;

	function makeVisible(tag) {
		console.log(tag);
	}

	vm.makeVisible = makeVisible;

	// Look into ng-showdown (md to html) or Pandoc or 
	// First view will bring up a table of images with overlay texts of the topics for each of the images
	// appearing from top to bottom, like on oceana.im, fade in and bring up more as you scroll down.
	// Same for Food and Music.

	
});