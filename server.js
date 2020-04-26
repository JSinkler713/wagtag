var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// multiparter works like multer to read the filestream
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

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

app.use('/dogs', picsController);  
app.get('/new', picsController);
app.post('/create', multipartMiddleware, picsController);

// TODO
//app.get('/edit/:id', picsController);
//app.post('/update', picsController);
//app.post('/destroy', picsController);
//app.get('/account/:id', picsController);

var port = app.get('port');
app.listen(port, function () {
  console.log('App running at ' + port);
});
