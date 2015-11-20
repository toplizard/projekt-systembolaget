
/**
 * Module dependencies
 */

var express = require('express'),
    morgan = require('morgan'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    parser = require('xml2json'),
    request = require('request'),
    mongoose = require('mongoose');

var app = module.exports = express();


mongoose.connect('mongodb://localhost/test', function(err){
    if(err){
        console.log('mongodb connection error', err);
    } else {
        console.log('mongodb connection successful');
    }
});
var Schema = mongoose.Schema;
var articleSchema = new Schema({
    articleId: Number,
    name: String,
    price: Number,
    volume: Number,
    alcoholPercent: String,
    prodType: String,
    producer: String
});
var Article = mongoose.model('Article', articleSchema);


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/updatedb', function(req, res){
    var url = 'http://www.systembolaget.se/api/assortment/products/xml';
    request(url, function (error, response, body) {
        console.log('Fetching XML from ' + url);
        if (!error && response.statusCode == 200) {
            var result = parser.toJson(body, {
                object: true,
                reversible: false,
                coerce: true,
                sanitize: true,
                trim: true,
                arrayNotation: false
            });
            res.send(result);
            var articleList = result.artiklar;


            for(i = 0; i < articleList.artikel.length; i++) {
                var article = new Article({
                    articleId: articleList.artikel[i].Varnummer,
                    name: articleList.artikel[i].Namn,
                    price: articleList.artikel[i].Prisinklmoms,
                    volume: articleList.artikel[i].Volymiml,
                    alcoholPercent: articleList.artikel[i].Alkoholhalt,
                    prodType: articleList.artikel[i].Varugrupp,
                    producer: articleList.artikel[i].Producent
                });

                //console.log(article);
                article.save(function(err){
                    if(err){
                        console.log('Error on save. Reason: ' + err);
                    }
                });
            };

            console.log("Database updated")

        };
    });
});



var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {

}

// production only
if (env === 'production') {

}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
