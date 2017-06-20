var app = angular.module('namiworld', ['ui.router', 'ui.router.title', 'ui.bootstrap', 'ng-showdown', 'angular-inview']); //include plugins in an array on the first line

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/main");
	$locationProvider.html5Mode(true).hashPrefix('!')
    //you define states in the config part of your app.js
    $stateProvider
    .state('main', {
        url: "/main",
        controller : 'MainController as vm',
        templateUrl : 'views/main.html',
        resolve: {
            $title: function() {
                return 'Main';
            }
        }
    })
    .state('bio', {
    	url: "/bio",
    	controller : 'BioController as vm',
    	templateUrl : 'views/bio.html',
        resolve: {
            $title: function() {
                return 'Bio';
            }
        }
    })
    .state('tech', {
        url: "/tech",
        controller : 'TechController as vm',
        templateUrl : 'views/tech.html',
        resolve: {
            $title: function() {
                return 'Tech';
            }
        }
    })
    .state('food', {
        url: "/food",
        controller : 'FoodController as vm',
        templateUrl : 'views/food.html',
        resolve: {
            $title: function() {
                return 'Food';
            }
        }
    })
    .state('music', {
    	url: "/music",
    	controller : 'MusicController as vm',
    	templateUrl : 'views/music.html',
        resolve: {
            $title: function() {
                return 'Music';
            }
        }
    });
});

app.run(function($rootScope) {
});