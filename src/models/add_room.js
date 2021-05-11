'use strict'

const { Schema, model} = require('mongoose');

const newRoom = new Schema ({
    userId: String,
    deviceRoom: String
    });

module.exports = model('User_Room', newRoom);