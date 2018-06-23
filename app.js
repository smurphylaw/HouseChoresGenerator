/*  
    House Chores Generator Project  
*/

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var routes = require('./routes/router');

var app = express();
var handlebars = require('express-handlebars').create({
  defaultLayout:'main'
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

// Handle MongoDB Errors
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
   // Connected! 
});


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Track login
app.use(session({
    secret: 'housechores',
    resave: true,
    saveUninitialized: false
}));

const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

//app.get('/', function(req, res) {
//  res.render('generator');
//});

app.use('/', routes);
//app.use('/generator', require('./routes/generator.js'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
