'use strict'

const Device = require('../models/list_devices');
const User_Device = require('../models/add_device');

var devicesController = {

    // ADD NEW DEVICE
    addDevice: async function(req, res){
        const {deviceClass, deviceName, deviceSerial, deviceRoom} = req.body;

        if(deviceClass == null || deviceRoom == null || deviceName == '' || deviceSerial == ''){
            console.log('The input data is wrong!');

            return res.status(400).send({
                auth: true,
                message: "The input data is wrong!" });
        }

        try {
            const deviceVerify = await User_Device.findOne({userId: req.userId, deviceSerial: deviceSerial});

            if(deviceVerify){
                console.log('The Device already exists')

                return res.status(400).send({
                    auth: true,
                    message: "The Device already exists" });
            }

            const data = await Device.findOne({deviceClass: deviceClass});

            const newDevice = new User_Device ({
                userId: req.userId,
                deviceClass: deviceClass,
                deviceIcon: data.deviceIcon,
                deviceName: deviceName,
                deviceSerial: deviceSerial,
                deviceRoom: deviceRoom,
                online: false,
                status:  false
            });

            await newDevice.save();

            console.log('Device Added Successfully!');
            console.log(newDevice);
        
            return res.status(201).send({
                auth: true,
                message: "Device Added Successfully!" });

        } catch (error) {
            console.log('An error occured, please contact to Adminitrator!');

            return res.status(400).send({
                auth: true,
                message: "An error occured, please contact to Adminitrator!" });
        }
    },

    // EDIT DEVICE (CHANGE NAME OR DEVICE ROOM)
    editDevice: async function(req, res){
        const {deviceSerial, newRoom, newName} = req.body;

        try {
            const deviceVerify = await User_Device.findOne({userId: req.userId, deviceSerial: deviceSerial});
    
            if(deviceVerify){
                console.log('The Device exists');
                
                User_Device.updateOne({userId: req.userId, deviceSerial: deviceSerial}, {deviceRoom: newRoom, deviceName: newName}, 
                    function (error) {
                        if (error) return handleError(error);
                    }
                );
    
                return res.status(200).send({
                    auth: true,
                    message: 'Device Updated Successfully!'});
                
            } else {
                console.log('The Device not exists');

                return res.status(400).send({
                    auth: true,
                    message: 'The Device not exists'});
            }
            
            
        } catch (error) {
            console.log('An error occured, please contact to Adminitrator!');

            return res.status(400).send({
                auth: true,
                message: "An error occured, please contact to Adminitrator!" });
        }
    },

    // DELETE DEVICE
    deleteDevice: async function(req, res){
        const {deviceSerial} = req.body;

        try {
            const deviceVerify = await User_Device.findOne({userId: req.userId, deviceSerial: deviceSerial});

            if(deviceVerify){

                User_Device.deleteOne({ userId: req.userId ,deviceSerial: deviceSerial }, 
                    function (error) {
                    if (error) return handleError(error);
                    }
                );

                return res.status(200).send({
                    auth: true,
                    message: 'Device Delete Successfully!'});
                
            } else {
                console.log('The Device not exists');

                return res.status(400).send({
                    auth: true,
                    message: 'The Device not exists'});
            }

        } catch (error) {
            console.log('An error occured, please contact to Adminitrator!');

            return res.status(400).send({
                auth: true,
                message: "An error occured, please contact to Adminitrator!" });
        }
    },

    // LIST uCONTROL DEVICES
    listDevices: async function(req, res){

        try {
            const devices = await Device.find();
            
            return res.status(200).send({
                auth: true,
                devices});
            
        } catch (error) {
            return res.status(400).send({
                auth: true,
                message: "An error occured, please contact to Adminitrator!" });
        }
    },

    // LIST USER DEVICES
    listUserDevices: async function(req, res){

        try {
            const userDevices = await User_Device.find({userId: req.userId}, {__v: 0});
            console.log('Device List:');
            console.log(userDevices);

            return res.status(200).send({
                auth: true,
                userDevices});

        } catch (error) {
            return res.status(400).send({
                auth: true,
                message: "An error occured, please contact to Adminitrator!" });
        }
    },

    // POR ELIMINAR
    editStatusDevice: async function(req, res){
        const {_id, status} = req.body;
        const deviceVerify = await User_Device.findOne({_id: _id});

        if(deviceVerify){
            console.log(req.body.status);
            User_Device.findByIdAndUpdate(_id, {status: status }, function (error) {
                if (error) return handleError(error);
              });
            return res.status(200).send({
                code: '200',
                message: 'Device Update Successfully!'});
            
        } else {
            console.log('The Device not exists')
            return res.status(400).send({
                error:{
                    code: "400",
                    message: "The Device not exists"
                },
                obs: "Enter other ID"});
        }

    }

};

module.exports = devicesController;