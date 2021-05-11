'use strict'

const mongoose = require('mongoose');
//const io = require('socket.io')(3100);
const User = require('./models/users');
require('dotenv').config();

//mongoose.connect('mongodb://superAdmin:password@localhost:27017/ucontrol', {
//mongoose.connect('mongodb://localhost:27017/ucontrol', {
mongoose.connect(process.env.DB_CNN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}). then(db => {

    console.log('MongoDB: Connection established successfully!');
})
.catch(error => console.log("Can not connect to mongodb"));


//module.exports = io;