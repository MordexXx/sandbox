'use strict';

const express = require('express');
const bodyParder = require('body-parser');
const socketIO = require('socket.io');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;


const app = express();

//BODY PARSER MIDDLEWARE
app.use(bodyParder.json());
app.use(bodyParder.urlencoded({extended: false}));

//DEFINE DATABASE CONNECTION CLIENT
const { Client } = require('pg');

//SET CURRENT DATE TO A VARIABLE
var dateTime = require('node-datetime');
var dt = dateTime.create();
var date = dt.format('d-m-Y');

//VARIABLES FOR SQL QUERIES AND RESULT
var comments = '';
var sql;

//SOCKET.IO
const server = express()
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

//DO STUFF WHEN CLIENTS CONNECT
io.on('connection', (socket) => {
    //LOG ACTIVE CONNECTIONS
    console.log('Client connected');
    //LOG DISCONNECTS
    socket.on('disconnect', () => console.log('Client disconnected'));

        //CONNECT TO DATABASE
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        });
        client.connect();

        //SET SQL QUERY INTO A VARIABLE
        sql = 'SELECT * FROM comments';
        //MAKE THE QUERY AND UPDATE THE GUESTBOOK COMMENTS VARIABLE
        client.query(sql, (err, res) => {
            comments = '';
            for (let row of res.rows) {        
                comments = `<b>${row.date} | ${row.name}: </b>${row.comment}<br>` + comments;              
            } 
        });
    //LISTEN FOR INSERT REQUESTS (THE SUBMIT BUTTON ON QUESTBOOK PAGE)  
    socket.on('sql', function(data){
        //PREPARE THE SQL QUERY
        sql = `INSERT INTO comments VALUES('${date}', '${data[0]}', '${data[1]}');`;
        //CONNECT TO DATABASE
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
         }); 
        client.connect();
        //MAKE THE SQL QUERY AND PUT RESULT INTO A VARIABLE WHICH WILL BE SEND TO THE CLIENT
        client.query(sql, (err, res) => {});
        sql = 'SELECT * FROM comments';
        client.query(sql, (err, res) => {
            comments = '';
            for (let row of res.rows) {
                //FORMAT THE RESULT        
                comments = `<b>${row.date} | ${row.name}: </b>${row.comment}<br>` + comments;               
            } 
        });
    });
});
//REFRESH QUESTBOOK COMMENTS EVERY SECOND WITH THE VARIABLE CONTAINING THE SQL QUERY RESULT
setInterval(() => io.emit('comments', comments, 1000));