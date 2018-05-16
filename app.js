var express = require('express');
var bodyParder = require('body-parser');
var path = require('path');

var app = express();

//Body Parser Middleware
app.use(bodyParder.json());
app.use(bodyParder.urlencoded({extended: false}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));


//DATABASE CONNECTION
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

app.post('/app.js', function(req, res){
    
    client.query('SELECT * FROM comments;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            comment = JSON.stringify(row);
            comments += `${comment}`;
        console.log(comments);    
    }
    client.end();
});

});


// app.post('/', function(req, res){
//     console.log(commets);
//     res.send(comments);
// });



app.listen(process.env.PORT);



