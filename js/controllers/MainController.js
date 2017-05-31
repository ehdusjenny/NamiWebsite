/*
 * Author: DoYeon (Nami) Kim
 */
 
angular.module('namiworld')
.controller('MainController', function($scope) {

	var vm = this;

	function updateLogoCSS() {
		document.getElementById("my-name").classList.add('name-update');
		document.getElementById("logo").classList.add('logo-update');
	}

	vm.updateLogoCSS = updateLogoCSS;
	
	$('.curved').show().arctext({radius: 200});

});