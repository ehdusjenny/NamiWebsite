angular.module('namiworld', ['ui.router', 'ui.bootstrap', 'ng-showdown', 'angular-inview', 'ui.router.title']) //include plugins in an array on the first line
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/main");
	//$locationProvider.html5Mode(true);
//you define states in the config part of your app.js
$stateProvider
.state('main', {
    url: "/main",
    controller : 'MainController',
    templateUrl : 'views/main.html',
    resolve: {
        $title: function() {
            return 'Main';
        }
    }
})
.state('bio', {
	url: "/bio",
	controller : 'BioController',
	templateUrl : 'views/bio.html',
    resolve: {
        $title: function() {
            return 'Bio';
        }
    }
})
.state('tech', {
    url: "/tech",
    controller : 'TechController',
    templateUrl : 'views/tech.html',
    resolve: {
        $title: function() {
            return 'Tech';
        }
    }
})
.state('food', {
    url: "/food",
    controller : 'FoodController',
    templateUrl : 'views/food.html',
    resolve: {
        $title: function() {
            return 'Food';
        }
    }
})
.state('music', {
	url: "/music",
	controller : 'MusicController',
	templateUrl : 'views/music.html',
    resolve: {
        $title: function() {
            return 'Music';
        }
    }
});
}).run(function($rootScope) {
});