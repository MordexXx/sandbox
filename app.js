var express = require('express');
var bodyParder = require('body-parser');
var path = require('path');

const fs = require('fs');

var app = express();

//Body Parser Middleware
app.use(bodyParder.json());
app.use(bodyParder.urlencoded({extended: false}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));


//CLEAR COMMENT CACHE FILE
var fd = fs.openSync('./public/test.txt', 'w');


//DATABASE CONNECTION
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

//SET INSERT QUERY VALUES
var dateTime = require('node-datetime');
var dt = dateTime.create();
var date = dt.format('Y-m-d');

var name = 'Taina Testaaja';

var comment = 'Tässä on minunkin viestini! Toimiikohan ääkköset?';


var query = `INSERT INTO comments VALUES ('${date}', '${name}', '${comment}');`;

console.log(query);

// app.post('/', function (req, res) {
    // client.query(query, (err, res) => {
    //     if (err) throw err;
    // });
// });



var comments = "<ul style=\"list-style-type: none;\">";

query = 'SELECT date::varchar,name,comment FROM comments';
client.query(query, (err, res) => {
    if (err) throw err;

    for (let row of res.rows) {
        comments += `<li>${row.date}</li><li>${row.name}</li><li>${row.comment}</li>`;           
        fs.writeFile('./public/test.txt', comments,  function(err) {
            if (err) {
               return console.error(err);
            }
            // fs.readFile('./public/test.txt', function (err, data) {
            //    if (err) {
            //       return console.error(err);
            //    }
            //    console.log("Asynchronous read: " + data.toString());
            // });
         });     
    } 
    client.end();

});


app.listen(process.env.PORT);

