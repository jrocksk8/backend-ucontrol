'use strict'

const { Schema, model } = require('mongoose');

const thermostateSchema = new Schema ({
    deviceSerial: String,
    temperature: Number,
    humidity: Number,
    }, {timestamps: true});

module.exports = model('Temperature', thermostateSchema);