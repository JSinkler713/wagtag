var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// multiparter works like multer to read the filestream
var methodOverride = require('method-override')
var dogsController = require('./controllers/dogsController');
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 4000);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride('_method'));

//routes    

//app.get('/', controller.index);

app.use('/dogs', dogsController);  

// TODO
//app.get('/edit/:id', dogsController);
//app.post('/update', dogsController);
//app.post('/destroy', dogsController);
//app.get('/account/:id', dogsController);

var port = app.get('port');
app.listen(port, function () {
  console.log('App running at ' + port);
});
