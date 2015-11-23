myApp.controller('AppCtrl', ['$scope', '$http', 'dbService', function ($scope, $http, dbService) {
    $http({
        method: 'GET',
        url: '/api/name'
    }).
    success(function (data, status, headers, config) {
        $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
        $scope.name = 'Error!';
    });

    $scope.updateDb = function(){
        console.log('calling dbService.updateDb');
        dbService.updateDb();
    };

    $scope.getArticleById = function(){
        console.log('getting article')
        dbService.getArticleById();
    };
}]);

myApp.controller('MyCtrl1', function ($scope) {

});

myApp.controller('MyCtrl2', function ($scope) {

});
