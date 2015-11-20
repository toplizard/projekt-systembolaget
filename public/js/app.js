var myApp = angular.module('myApp', []);

myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'partials/partial1',
            controller: 'MyCtrl1'
        })
        .when('/view1', {
            templateUrl: 'partials/partial1',
            controller: 'MyCtrl1'
        })
        .when('/view2', {
            templateUrl: 'partials/partial2',
            controller: 'MyCtrl2'
        })

    $locationProvider.html5Mode(true);
});
