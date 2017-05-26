angular.module('namiworld')
.controller('MainController', function($scope) {

	function updateLogoCSS() {
		document.getElementById("my-name").classList.add('name-update');
		document.getElementById("logo").classList.add('logo-update');
	}

	$scope.updateLogoCSS = updateLogoCSS;
	
	$('.curved').show().arctext({radius: 200});

});