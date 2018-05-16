var express = require('express');
var bodyParder = require('body-parser');
var path = require('path');

var app = express();

// var logger = function(req, res, next){
//     console.log('Logging...');
//     next();
// }

// app.use(logger);


//Body Parser Middleware
app.use(bodyParder.json());
app.use(bodyParder.urlencoded({extended: false}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
    res.send('Hello world');
});

app.listen(3000, function(){
    console.log('Server started...');
})

