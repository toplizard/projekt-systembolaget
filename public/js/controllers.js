myApp.controller('AppCtrl', [
    '$scope',
    '$rootScope',
    '$http',
    'dbService',
    'articleService',
    function ($scope,
              $rootScope,
              $http,
              dbService,
              articleService) {

        articleService.getArticles();

        $scope.updateDb = function(){
            console.log('calling dbService.updateDb');
            dbService.updateDb();
        };

        $scope.getArticleById = function(articleId){
            console.log('getting article')
            articleService.getArticleById(articleId);
        };

        $scope.getArticles = function(){
            console.log('controller called');
            articleService.getArticles();
        };

        $rootScope.articleList = [];

    }]);

myApp.controller("article",
    ["$scope", "$rootScope", "$routeParams", "$filter", 'articleService',
        function ($rootScope, $scope, $routeParams, $filter, articleService) {
            articleService.getArticleById($routeParams.articleId);
        }]);

myApp.controller('MyCtrl1', function ($scope) {

});

myApp.controller('MyCtrl2', function ($scope) {

});
