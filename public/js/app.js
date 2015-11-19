angular.module('myApp', [
    'myApp.controllers',
    'myApp.filters',
    'myApp.services',
    'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
    $routeProvider.

    when('/', {
        templateUrl: 'partials/partial1',
        controller: 'MyCtrl1'
    }).
    when('/view1', {
        templateUrl: 'partials/partial1',
        controller: 'MyCtrl1'
    }).
    when('/view2', {
        templateUrl: 'partials/partial2',
        controller: 'MyCtrl2'
    }).
    otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
});