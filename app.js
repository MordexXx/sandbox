var express = require('express');
var bodyParder = require('body-parser');
var path = require('path');


const fs = require('fs');


var app = express();


var query = 'SELECT * FROM comments;'

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

var comments = "<ul style=\"list-style-type: none;\">";

client.query(query, (err, res) => {
    if (err) throw err;

    

    for (let row of res.rows) {
        console.log(row.name);
        let date = JSON.stringify(row.date);
        let name = JSON.stringify(row.name);
        let comment = JSON.stringify(row.comment);
        comments += `<li>${date}</li><li>${name}</li><li>${comment}</li>`;        
        console.log(comments);
        
        fs.writeFile('./public/test.txt', comments,  function(err) {
            if (err) {
               return console.error(err);
            }
            
            console.log("Data written successfully!");
            console.log("Let's read newly written data");
            fs.readFile('./public/test.txt', function (err, data) {
               if (err) {
                  return console.error(err);
               }
               console.log("Asynchronous read: " + data.toString());
            });
         });     
    } 
    client.end();
});



app.listen(process.env.PORT);



