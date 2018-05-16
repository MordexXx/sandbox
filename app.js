var express = require('express');
var bodyParder = require('body-parser');
var path = require('path');

var app = express();


var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});

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


// app.get('/', function(req, res){
//     res.render('index');
// });

// app.listen(5000, function(){
//     console.log('Server started on port 5000...');
// })

