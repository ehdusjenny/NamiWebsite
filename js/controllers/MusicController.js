/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('MusicController', function($http) {
	
	var vm = this;

	vm.articleOpen = false;
	$http({
			url: '../../md/music/articles.json',
			method: 'GET',
			headers: {
   				'Content-Type': "application/json"
 			}
    }).then(function(response){
        vm.articles = response.data.articles;
    }, function(error){
        vm.articles = 'Error getting article titles!';
    });
    console.log(vm.articleOpen);
    vm.md = "";
    function loadArticle(filename) {
    	$http({
			url: '../../md/music/' + filename + '.md',
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