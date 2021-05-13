'use strict'

const { Schema, model } = require('mongoose');

const temperatureSchema = new Schema ({
    deviceSerial: String,
    temperature: Number,
    humidity: Number,
    }, {timestamps: true});

module.exports = model('Temperature', temperatureSchema);