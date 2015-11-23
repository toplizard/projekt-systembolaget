myApp.service('dbService', [function(){

    this.updateDb = function(){
        $.ajax({
            url: '/api/updatedb',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8'
        });
    };

    this.getArticleById = function(){
        var testData = {'articleId':'1'};
        console.log(JSON.stringify(testData));
        $.ajax({
            type: 'POST',
            data: JSON.stringify(testData),
            contentType: 'application/json',
            dataType: 'json',
            url: 'http://localhost:3000/api/getarticle'
        });
    };
}]);