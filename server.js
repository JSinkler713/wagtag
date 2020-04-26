var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// I will try to use multer for this same functionality
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


// multer


var picsController = require('./controllers/picsController');
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 4000);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));


//routes    

//app.get('/', controller.index);

app.get('/new', picsController.new);
app.post('/create', multipartMiddleware, picsController.create);

//app.get('/edit/:id', controller.edit);
//app.post('/update', controller.update);
//app.post('/destroy', controller.destroy);
//app.get('/account/:id', controller.find);

var port = app.get('port');
app.listen(port, function () {
  console.log('App running at ' + port);
});
