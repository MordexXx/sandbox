var express = require('express');
var bodyParder = require('body-parser');
var path = require('path');

const fs = require('fs');

var app = express();


//BODY PARSER MIDDLEWARE
app.use(bodyParder.json());
app.use(bodyParder.urlencoded({extended: false}));

//SET STATIC PATH
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT);

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
var date = dt.format('d-m-Y');

var name = 'Taina Testaaja';

var comment = 'Tässä on minunkin viestini! Toimiikohan ääkköset?';


var query = `INSERT INTO comments VALUES ('${date}', '${name}', '${comment}');`;

console.log(query);

app.post('*', function (req, res) {
    console.log(res.body);



    // client.query(query, (err, res) => {
    //     if (err) throw err;
    // });
});

var comments = "<ul style=\"list-style-type: none;\">";

query = 'SELECT * FROM comments';
client.query(query, (err, res) => {
    if (err) throw err;

    for (let row of res.rows) {
        comments += `<b><li>${row.date} | ${row.name}:</li></b><li>${row.comment}</li><br>`;           
        fs.writeFile('./public/comments.txt', comments,  function(err) {
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




app.post('*', function (req, res) {
    console.log(res.body);



    // client.query(query, (err, res) => {
    //     if (err) throw err;
    // });
});

