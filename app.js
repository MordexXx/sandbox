var express = require('express');
var bodyParder = require('body-parser');
var path = require('path');

var app = express();


//Body Parser Middleware
app.use(bodyParder.json());
app.use(bodyParder.urlencoded({extended: false}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));


app.listen(process.env.PORT);

app.post('/', function(req, res){
  var result = req.rawBody;
  res.send("hello there world data is " + result);
});


//DATABASE CONNECTION
var pg = require('pg');
var conString = "postgres://eostjvbcswkgkx:b508c6ca0068375b0ef8526bf19f0d233ca38343629b4d18b20af5dc0d7172c8@ec2-79-125-12-48.eu-west-1.compute.amazonaws.com:5432/dahedgbqcsnn6l";

var client = new pg.Client(conString);
client.connect();