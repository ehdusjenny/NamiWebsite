angular.module('namiworld', ['ui.router', 'ui.bootstrap']) //include plugins in an array on the first line
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/");
	$locationProvider.html5Mode(true);
//you define states in the config part of your app.js
$stateProvider
.state('bio', {
	url: "/bio",
	controller : 'BioCtrl',
	templateUrl : 'views/bio.html',
    resolve: {
        $title: function() {
            return 'Bio';
        }
    }
})
.state('tech', {
    url: "/tech",
    controller : 'TechCtrl',
    templateUrl : 'views/tech.html',
    resolve: {
        $title: function() {
            return 'Tech';
        }
    }
})
.state('food', {
    url: "/food",
    controller : 'FoodCtrl',
    templateUrl : 'views/food.html',
    resolve: {
        $title: function() {
            return 'Food';
        }
    }
})
.state('music', {
	url: "/music",
	controller : 'MusicCtrl',
	templateUrl : 'views/music.html',
    resolve: {
        $title: function() {
            return 'Music';
        }
    }
});
}).run(function($rootScope) {
});