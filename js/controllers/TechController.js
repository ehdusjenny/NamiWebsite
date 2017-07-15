/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('TechController', function($http, $state, $rootScope, FoodArticle) {

	var vm = this;

	var url = window.location.href;
	console.log(url);
    var last_word = url.substring(url.lastIndexOf("/") + 1, url.length);
	if (last_word != 'tech' && last_word != 'blog' && last_word != 'bio' && last_word != 'main' && last_word != 'food'
        && !url.includes('/food/') && !url.includes('/blog/') && !url.includes('/bio/') && !url.includes('/main/')) {
        vm.articleOpen = true;
    }
    else {
        vm.articleOpen = false;
    }

	/*
	 * articles.json has a list of articles,
	 * and each article has a title, filename, tags, and created properties.
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

	function goToArticle(article) {
        FoodArticle.setArticle(article);
        vm.articleOpen = true;
        console.log(article.filename);
        $state.go("tech.article", {"articleName" : article.filename});
    }
    vm.goToArticle = goToArticle;

	function backToOverview() {
	    vm.articleOpen = false;
	}
	vm.backToOverview = backToOverview;

	// like on oceana.im, fade in and bring up more as you scroll down.
	// Same for Food and Music.

	$rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams){ 
        if (toState.name == "tech") {
            vm.articleOpen = false;
        }
    })
});