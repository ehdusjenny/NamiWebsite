angular.module('namiworld', ['ui.router', 'ui.bootstrap']) //include plugins in an array on the first line
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/");
	$locationProvider.html5Mode(true);
//you define states in the config part of your app.js
$stateProvider
.state('blog', {
	url: "/blog",
	controller : 'BlogCtrl',
	templateUrl : 'views/blog.html',
    resolve: {
        $title: function() {
            return 'Blog';
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
})
.state('about', {
	url: "/about",
	controller : 'AboutCtrl',
	templateUrl : 'views/about.html',
    resolve: {
        $title: function() {
            return 'About';
        }
    }
})
.state('contact', {
	url: "/contact",
	controller : 'ContactCtrl',
	templateUrl : 'views/contact.html',
    resolve: {
        $title: function() {
            return 'Contact';
        }
    }
});

}).run(function($rootScope) {
//code to run when index.html loads
});