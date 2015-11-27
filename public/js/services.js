myApp.service('dbService', [function(){

    this.updateDb = function(){
        $.ajax({
            url: '/api/updatedb',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8'
        });
    };

}]);

myApp.service('articleService', ['$rootScope', '$http', function($rootScope, $http){

    this.getArticleById = function(articleId){
        var queryId = {'articleId':articleId};

        $http({
            method: 'POST',
            data: JSON.stringify(queryId),
            url: 'http://localhost:3000/api/getarticle'
        })
            .success(function(response){
                $rootScope.article = response[0];
            });
    };

    this.getArticles = function(){

        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/getarticles'
        })
            .success(function(response){
                $rootScope.articleList = response;
            });
    };

}]);