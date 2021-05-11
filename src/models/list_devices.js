'use strict'

const { Schema, model} = require('mongoose');

const newDevice = new Schema ({
    deviceClass: String,
    deviceIcon: Number
    });

module.exports = model('Device', newDevice);