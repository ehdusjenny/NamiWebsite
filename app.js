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
    .state('tech.article', {
        url: "/:articleName",
        controller : 'TechAticleController as vm',
        templateUrl : 'views/tech.html',
        resolve: {
            $title: function() {
                return 'Tech';
            }
        }
    })
    .state('blog', {
        url: "/blog",
        controller : 'BlogController as vm',
        templateUrl : 'views/blog.html',
        resolve: {
            $title: function() {
                return 'Blog';
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
    .state('food.city', {
        url: "/city/:cityName",
        controller : 'FoodCityController as vm',
        templateUrl : 'views/food-city.html',
        resolve: {
            $title: function($stateParams) {
                return "articleName";
            }
        }
    })
    .state('food.article', {
        url: "/:articleName",
        controller : 'FoodArticleController as vm',
        templateUrl : 'views/food-article.html',
        resolve: {
            $title: function($stateParams) {
                var tmp = $stateParams.articleName.replace(/_/g , " ");
                return tmp.replace(/\w\S*/g, function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            }
        }
    });
});

app.run(function($rootScope) {
});