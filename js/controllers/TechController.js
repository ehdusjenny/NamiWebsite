angular.module('namiworld')
.controller('TechController', function($http) {

	var vm = this;

	$http({
			url: '../../md/oop_beginners.md',
			method: 'GET'
    }).then(function(response){
        vm.oop_beginners_md = response.data;
    }, function(error){
        vm.oop_beginners_md = 'error';
    });  

	// Look into ng-showdown (md to html) or Pandoc or 
	// First view will bring up a table of images with overlay texts of the topics for each of the images
	// appearing from top to bottom, like on oceana.im, fade in and bring up more as you scroll down.
	// Same for Food and Music.

	
});