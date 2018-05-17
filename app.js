const express = require('express');
const bodyParder = require('body-parser');
const path = require('path');
const socketIO = require('socket.io');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'public');


const app = express()
.use((req, res) => res.sendFile(INDEX) )
.listen(PORT, () => console.log(`Listening on ${ PORT }`));


//BODY PARSER MIDDLEWARE
app.use(bodyParder.json());
app.use(bodyParder.urlencoded({extended: false}));

//SET STATIC PATH
//app.use(express.static(path.join(__dirname, 'public')));


//SOCKET SETUP
const io = socketIO(app);

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
  });

//DATABASE CONNECTION

const { Client } = require('pg');


var comments = "<ul style=\"list-style-type: none;\">";


//SET INSERT QUERY VALUES
var dateTime = require('node-datetime');
var dt = dateTime.create();
var date = dt.format('d-m-Y');

var name;
var comment;
var sql;

sql = 'SELECT * FROM comments';

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
})

client.connect();
client.query(sql, (err, res) => {
    if (err) throw err;

    for (let row of res.rows) {

        //localStorage.setItem(comments,row);
        // comments += `<b><li>${row.date} | ${row.name}:</li></b><li>${row.comment}</li><br>`;           
        // fs.writeFile('./public/comments.txt', comments,  function(err) {
        //     if (err) {
        //        return console.error(err);
        //     }

        //  });     
    } 

});


app.post('*', (req, res) => {
    var result;
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
            sql = 'SELECT * FROM comments';
            client.query(sql, (err, res) => {
                if (err) throw err;

                for (let row of res.rows) {
                    result += `${row}`;
                    comments += `<b><li>${row.date} | ${row.name}:</li></b><li>${row.comment}</li><br>`;           
                    fs.writeFile('./public/comments.txt', comments,  function(err) {
                        if (err) {
                           return console.error(err);
                        }
            
                     });     
                } 
            
            });
            


        });
    

    //res.redirect('/');
    // client.end(); 
    // });
    res.send(result);
});


setInterval(() => io.emit('time', new Date().toTimeString()), 1000);