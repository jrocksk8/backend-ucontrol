'use strict'

const User_Device = require('../models/add_device');
const User_Room = require('../models/add_Room');
const Rooms_Device = require('../models/room_devices');

var devicesController = {

    // LIST ONE ROOM WITH THEIR DEVICES
    roomDevices: async function(req, res){
        const {deviceRoom} = req.body;

        try {

            if (deviceRoom == null){
            
                return res.status(400).send({
                    auth: true,
                    message: "The argument (device room) is empty"});    
            }

            const roomsDevices = await Rooms_Device.find({userId: req.userId, deviceRoom: deviceRoom}, {__v: 0, _id: 0});
            console.log(roomsDevices);
    
            return res.status(200).send({
                auth: true,
                roomsDevices});
                
        } catch (error) {
            return res.status(400).send({
                auth: true,
                message: "An error occured!, please contact to administrator."}); 
        }
    },

    // LIST ALL USER ROOMS WITH THEIR DEVICES
    userRoomsDevices: async function(req, res){

        try {
            const roomsDevices = await Rooms_Device.find({userId: req.userId}, {__v: 0, _id: 0});
            console.log(roomsDevices);
            
            return res.status(200).send({
                auth: true,
                roomsDevices});

        } catch (error) {
            return res.status(400).send({
                auth: true,
                message: "An error occured!, please contact to administrator."});
        }
    },

    // LIST ALL USER ROOMS (WITHOUT DEVICES)
    userRooms: async function(req, res){
        
        try {
            const rooms = await User_Room.find({userId: req.userId}, {__v: 0, _id: 0});
            console.log(rooms);

            return res.status(200).send({
                auth: true,
                rooms});
    
        } catch (error) {
            return res.status(400).send({
                auth: true,
                message: "An error occured, please contact to Adminitrator!" });   
        }
    },

    // ADD ROOM
    addRoom: async function(req, res){
        const {deviceRoom} = req.body;

        try {
            const roomVerify = await User_Room.findOne({userId: req.userId, deviceRoom: deviceRoom}, {__v: 0, _id: 0});

            if(roomVerify){
                console.log('The Room already exists')

                return res.status(400).send({
                    auth: true,
                    message: "The Room already exists"});
            }

            const newRoom = new User_Room ({
                userId: req.userId,
                deviceRoom: deviceRoom
            });

            await newRoom.save();
    
            console.log('Room Added Successfully!');
            console.log(newRoom);
           
            return res.status(201).send({
                auth: true,
                message: 'Room added successfully!'});
            
        } catch (error) {
            return res.status(400).send({
                auth: true,
                message: "An error occured, please contact to Adminitrator!" });
        }
    },

    // EDIT ROOM
    editRoom: async function(req, res){
        const {deviceRoom, newName} = req.body;

        try {
            const roomVerify = await User_Room.findOne({userId: req.userId, deviceRoom: deviceRoom}, {__v: 0, _id: 0});

            if(roomVerify){
                console.log('The room exists')
                
                User_Room.updateOne({userId: req.userId, deviceRoom: deviceRoom}, {deviceRoom: newName}, 
                    function (error) {
                        if (error) return handleError(error);
                  }
                );
    
                User_Device.updateMany({userId: req.userId, deviceRoom: deviceRoom}, {deviceRoom: newName}, 
                    function (error) {
                        if (error) return handleError(error);
                  }
                );
                
                return res.status(200).send({
                    auth: true,
                    message: 'The name is updated successfully!'});
            } else {
                return res.status(400).send({
                    auth: true,
                    message: 'The room not exists!'});
            }
            
        } catch (error) {
            return res.status(400).send({
                auth: true,
                message: "An error occured, please contact to Adminitrator!" });
        }
    },

    // DELETE ROOM
    deleteRoom: async function(req, res){
        const {deviceRoom} = req.body;

        try {
            // room is empty?
            const deviceVerify = await User_Device.findOne({userId: req.userId, deviceRoom: deviceRoom});

            if(deviceVerify){
                return res.status(400).send({
                    auth: true,
                    message: "The room is not empty!"});
            }

            // room exists?
            const deviceVerify2 = await User_Room.findOne({userId: req.userId, deviceRoom: deviceRoom});

            if(deviceVerify2){

                User_Room.deleteOne({ userId: req.userId ,deviceRoom: deviceRoom }, 
                    function (error) {
                        if (error) return handleError(error);
                    }
                );

                return res.status(200).send({
                    auth: true,
                    message: 'Delete room successfully!'});
                
            } else {
                console.log('The room not exists');
                
                return res.status(400).send({
                    auth: true,
                    message: "The room not exists"});
            }

        } catch (error) {
            return res.status(400).send({
                auth: true,
                message: "An error occured, please contact to Adminitrator!" });
        }
    },

};

module.exports = devicesController;
