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