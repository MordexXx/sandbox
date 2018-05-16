var express = require('express');
var bodyParder = require('body-parser');
var path = require('path');

var app = express();

var comments;

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


client.query('SELECT * FROM comments;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
      comments = row;
    }
    client.end();
  });




app.listen(process.env.PORT);

app.post('/', function(req, res){
    console.log(commets);
    res.send(comments);
});

