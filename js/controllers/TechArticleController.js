/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('TechArticleController', function($scope, $state, $http, FoodArticle) {
	var vm = this;

	var article = FoodArticle.getArticle();
	var filename;
	if (!article) {
		var url = window.location.href;
		filename = url.substring(url.lastIndexOf("/") + 1, url.length);
		if (filename.includes("#")) {
			filename = filename.substring(0, filename.lastIndexOf("#"));
		}
	}
	else {
		filename = article.filename;
	}

	vm.md = "";
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