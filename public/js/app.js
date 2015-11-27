var myApp = angular.module('myApp', []);

myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/articles', {
            templateUrl: 'partials/articles',
            controller: ''
        })
        .when('/articles/:articleId', {
            templateUrl: 'partials/article',
            controller: 'article'
        })
        .when('/test', {
            templateUrl: '/partials/partial2',
            controller: 'AppCtrl'
        })
        .otherwise({
            redirectTo: "/articles"
        });

    $locationProvider.html5Mode(true);
});
