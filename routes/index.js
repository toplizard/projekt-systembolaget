
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index');
};

exports.article = function (req, res) {
    var articleId = req.params.articleId;
    res.render('partials/' + articleId);
};

exports.test = function(req, res){
    res.render('partials/partial2');
};
