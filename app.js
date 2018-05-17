'use strict';

const express = require('express');
const bodyParder = require('body-parser');
const socketIO = require('socket.io');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
//const INDEX = path.join(__dirname, 'public');

const app = express();

//BODY PARSER MIDDLEWARE
app.use(bodyParder.json());
app.use(bodyParder.urlencoded({extended: false}));

//DATABASE CONNECTION
const { Client } = require('pg');

var dateTime = require('node-datetime');
var dt = dateTime.create();
var date = dt.format('d-m-Y');
var comments = "<ul style=\"list-style-type: none;\">";
var sql;

//SOCKET.IO
const server = express()
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));


        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        });

        client.connect();
        sql = 'SELECT * FROM comments';
        client.query(sql, (err, res) => {
            comments = "<ul style=\"list-style-type: none;\">";
            for (let row of res.rows) {        
                comments += `<b><li>${row.date} | ${row.name}:</li></b><li>${row.comment}</li><br>`;             
            } 
        });


    socket.on('sql', function(data){
        sql = `INSERT INTO comments VALUES('${date}', '${data[0]}', '${data[1]}');`;
        //console.log(sql);
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
         }); 
        client.connect();
        client.query(sql, (err, res) => {});
        sql = 'SELECT * FROM comments';
        client.query(sql, (err, res) => {
            comments = "<ul style=\"list-style-type: none;\">";
            for (let row of res.rows) {        
                comments += `<b><li>${row.date} | ${row.name}:</li></b><li>${row.comment}</li><br>`;             
            } 
        });
    });
});

setInterval(() => io.emit('comments', comments, 1000));