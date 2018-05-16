var express = require('express');
var bodyParder = require('body-parser');
var path = require('path');


const fs = require('fs');


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

var query = 'SELECT * FROM comments;'

client.query(query, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(row);
        // comment = JSON.stringify(row);
        // comments += `${comment}`;        
        // console.log(comments);
            
    }    
client.end();
});

var testing = 'Test succesful!';
console.log("Going to write into existing file");
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
// app.post('/', function(req, res){
  
// });


// app.post('/', function(req, res){
//     console.log(commets);
//     res.send(comments);
// });



app.listen(process.env.PORT);



