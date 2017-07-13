/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('TechArticleController', function($scope, $state, $http, FoodArticle) {
	var vm = this;
	
	vm.md = "";
	var filename = FoodArticle.getArticle().filename;

    function loadArticle() {
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
	loadArticle();
	
});