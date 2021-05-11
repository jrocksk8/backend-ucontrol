'use strict'

const { Schema, model} = require('mongoose');

const roomsDevices = new Schema ({
    userId: String,
    deviceRoom: String,
    devices: Array
    });

module.exports = model('Rooms_Device', roomsDevices);