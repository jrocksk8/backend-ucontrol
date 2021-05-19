'use strict'

const Temperature = require('../models/thermostat');

var thermostatController = {

    // GET TEMPERATURES
    data: async function(req, res){
        const {deviceSerial} = req.body;

        try {
            const temp = await Temperature.find({"deviceSerial": deviceSerial});
            
            return res.status(200).send({
                auth: true,
                temp});
            
        } catch (error) {
            return res.status(400).send({
                auth: true,
                message: "An error occured, please contact to Adminitrator!" });
        }
    },

    dataLastWeek: async function(req, res){
        const {deviceSerial} = req.body;

        const endDate = new Date();
        const startDate = new Date (endDate.getTime() - (1000 * 60 * 60 * 24 * 7));

        console.log('startDate: ' + startDate, 'endDate: ' + endDate);

        try {
            const temp = await Temperature.find({$and: [{createdAt: {$gte: new Date(startDate)}}, {createdAt: {$lt: new Date(endDate)}}, {deviceSerial: deviceSerial}]}, {_id: 0, createdAt:0, updatedAt: 0, __v: 0});
            
            return res.status(200).send({
                auth: true,
                temp});
            
        } catch (error) {
            return res.status(400).send({
                auth: true,
                message: "An error occured, please contact to Adminitrator!" });
        }
    },

    dataLastDay: async function(req, res){
        const {deviceSerial} = req.body;

        const endDate = new Date();
        const startDate = new Date (endDate.getTime() - (1000 * 60 * 60 * 24));

        console.log('startDate: ' + startDate, 'endDate: ' + endDate);

        try {
            const temp = await Temperature.find({$and: [{createdAt: {$gte: new Date(startDate)}}, {createdAt: {$lt: new Date(endDate)}}, {deviceSerial: deviceSerial}]}, {_id: 0, createdAt:0, updatedAt: 0, __v: 0});
            
            return res.status(200).send({
                auth: true,
                temp});
            
        } catch (error) {
            return res.status(400).send({
                auth: true,
                message: "An error occured, please contact to Adminitrator!" });
        }
    },

    dataLasthour: async function(req, res){
        const {deviceSerial} = req.body;

        const endHour = new Date();
        const startHour = new Date (endHour.getTime() - (1000 * 60 * 60 * 1));
        console.log('startHour: ' + startHour, 'endHour: ' + endHour);

        try {
            const temp = await Temperature.find({$and: [{createdAt: {$gte: startHour}}, {createdAt: {$lt: endHour}}, {deviceSerial: deviceSerial}]}, {_id: 0, updatedAt: 0, __v: 0});
            
            return res.status(200).send({
                auth: true,
                temp});
            
        } catch (error) {
            console.log(error);
            return res.status(400).send({
                auth: true,
                message: "An error occured, please contact to Adminitrator!" });
        }
    },
}

module.exports = thermostatController;