myApp.service('dbService', [function(){

    this.updateDb = function(){
        $.ajax({
            url: "/api/updatedb",
            type: 'post',
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        });
    };
}]);