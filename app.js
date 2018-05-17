'use strict';

const express = require('express');
const bodyParder = require('body-parser');
const socketIO = require('socket.io');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
//const INDEX = path.join(__dirname, 'public');

const app = express();

//DATABASE CONNECTION
const { Client } = require('pg');

var dateTime = require('node-datetime');
var dt = dateTime.create();
var date = dt.format('d-m-Y');
var comments = "<ul style=\"list-style-type: none;\">";

//SOCKET.IO
const server = express()
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));

    socket.on('sql', function(data){
        sql = `INSERT INTO comments VALUES('${date}', '${data[0]}', '${data[1]}');`;
        //console.log(sql);
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
         }) 
        client.connect();
        client.query(sql, (err, res) => {});
        client.query(sql, (err, res) => {
            for (let row of res.rows) {        
                comments += `<b><li>${row.date} | ${row.name}:</li></b><li>${row.comment}</li><br>`;             
            } 
        });
    });
});

//app.listen(process.env.PORT);
//app.listen(3000);

//BODY PARSER MIDDLEWARE
app.use(bodyParder.json());
app.use(bodyParder.urlencoded({extended: false}));

//SET STATIC PATH
// app.use(express.static(path.join(__dirname, 'public')));








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



setInterval(() => io.emit('comments', comments, 1000));