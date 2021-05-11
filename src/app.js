const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

//App Express
const app = express();

const sslserver = https.createServer({
    key: fs.readFileSync('./cert/key.key'), 
    cert: fs.readFileSync('./cert/cert.pem')}, 
    app);

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Path público
const publicPath = path.resolve(__dirname, '../public');
app.use( express.static(publicPath) );

//load rute files
const users_routes = require('./routes/users');
const devices_routes = require('./routes/devices');
const rooms_routes = require('./routes/rooms');
//const { Console } = require('console');


//routes
app.use('/api', users_routes);
app.use('/api', devices_routes);
app.use('/api', rooms_routes);

//exports
module.exports = sslserver;
