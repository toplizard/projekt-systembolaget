
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
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var app = module.exports = express();





/**
 * Schemas
 */

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

var commentSchema = new Schema({
    commentId: Number,
    body: String,
    date: Date,
    userId: Number
});
var Comment = mongoose.model('Comment', commentSchema);


/**
 * Hooks
 */

articleSchema.pre('save', function(next){
    var self = this;
    Article.find({articleId: self.articleId}, function(err, docs){
        if(!docs.length){
            next();
        } else {
            console.log('article exists: ', self.articleId + ' ' + self.name);
            next(new Error("Article exists!"));
        }
    });
});


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ strict: true }));


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:articleId', routes.article);
app.get('/test', routes.test);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


// Update database API
app.post('/api/updatedb', function(){
    var url = 'http://www.systembolaget.se/api/assortment/products/xml';
    request(url, function (error, response, body) {
        console.log('Fetching XML from ' + url);
        if (!error && response.statusCode == 200) {
            var result = parser.toJson(body, {
                object: true,
                reversible: false,
                coerce: true,
                sanitize: false,
                trim: true,
                arrayNotation: false
            });

            var articleList = result.artiklar;
            for(i = 0; i < articleList.artikel.length; i++) {
                var article = new Article({
                    articleId: articleList.artikel[i].Artikelid,
                    name: articleList.artikel[i].Namn,
                    price: articleList.artikel[i].Prisinklmoms,
                    volume: articleList.artikel[i].Volymiml,
                    alcoholPercent: articleList.artikel[i].Alkoholhalt,
                    prodType: articleList.artikel[i].Varugrupp,
                    producer: articleList.artikel[i].Producent
                });

                article.save(function(err){
                    if(err){
                        console.log('Error on save. Reason: ' + err);
                    }
                });
            };

            console.log("Database updated");
        };
    });
});

app.post('/api/getarticle', function(req, res){
    var query = req.body;

    Article.find(query, function(err, article){
        if(err){
            return console.error(err);
        } else {
            res.send(article);
        }
    });
});

app.post('/api/getarticles', function(req, res){
    Article.find(function(err, articles){
        if(err){
            return console.error(err);
        } else {
            res.send(articles);
        }
    });
});




/**
 * Connect to database
 * Start Server
 */

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function(){
    console.log('Connection established');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
