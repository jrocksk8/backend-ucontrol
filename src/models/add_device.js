'use strict'

const { Schema, model } = require('mongoose');

const newUserDeviceSchema = new Schema ({
    userId: String,
    deviceClass: String,
    deviceIcon: Number,
    deviceName: String,
    deviceSerial: String,
    deviceRoom: String,
    online: Boolean,
    status: Boolean
    }, {timestamps: true});

module.exports = model('User_Device', newUserDeviceSchema);
