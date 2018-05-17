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



//CLEAR COMMENT CACHE FILE
var fd = fs.openSync('./public/test.txt', 'w');


//DATABASE CONNECTION

const { Client } = require('pg');


//SET INSERT QUERY VALUES
var dateTime = require('node-datetime');
var dt = dateTime.create();
var date = dt.format('d-m-Y');

var name;
var comment;
var sql;



app.post('*', (req, res) => {
    console.log(req.body);
    name = (req.body.name);
    comment = (req.body.comment);
    sql = `INSERT INTO comments VALUES('${date}', '${name}', '${comment}');`;
    console.log(sql);
    // sql = JSON.parse(sql);
    // console.log(sql);
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    });
    client.connect()
        .then(() => {
            console.log('Connection succesful');
            client.query(sql, (err, res) => {
                if (err) throw err;
            });
        });
    

    //res.redirect('/');
    // client.end(); 
    // });
});

var comments = "<ul style=\"list-style-type: none;\">";

sql = 'SELECT * FROM comments';

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
})

client.connect();
client.query(sql, (err, res) => {
    if (err) throw err;

    for (let row of res.rows) {
        comments += `<b><li>${row.date} | ${row.name}:</li></b><li>${row.comment}</li><br>`;           
        fs.writeFile('./public/comments.txt', comments,  function(err) {
            if (err) {
               return console.error(err);
            }

         });     
    } 

});


app.listen(process.env.PORT);