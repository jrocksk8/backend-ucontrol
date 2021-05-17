'use strict'

const Temperature = require('../models/thermostat');

var thermostatController = {

    // GET TEMPERATURES
    temp: async function(req, res){
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

    tempLastDay: async function(req, res){
        const {dateNow, deviceSerial} = req.body;

        const endDate = dateNow.substring(0,10);
        const startDate = endDate.substring(0,8).concat(Number(endDate.substring(8) - 1))

        console.log('Fecha Recibida: ' + dateNow, 'startDate: ' + startDate, 'endDate: ' + endDate);

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

    tempLasthour: async function(req, res){
        const {dateNow, deviceSerial} = req.body;

        const endHour = dateNow;

        console.log(endHour.substring(11,12));

        if (endHour.substring(11,12) == '0'){
            const startHour = endHour.substring(0,11).concat(Number(0)).concat(Number(endHour.substring(12,13)-1)).concat(endHour.substring(13));
            console.log('Fecha Recibida: ' + dateNow, 'startHour: ' + startHour, 'endHour: ' + endHour);

            try {
                const temp = await Temperature.find({$and: [{createdAt: {$gte: startHour}}, {createdAt: {$lt: endHour}}, {deviceSerial: deviceSerial}]}, {_id: 0, updatedAt: 0, __v: 0});
                
                return res.status(200).send({
                    auth: true,
                    temp});
                
            } catch (error) {
                return res.status(400).send({
                    auth: true,
                    message: "An error occured, please contact to Adminitrator!" });
            }

        } else {
            const startHour = endHour.substring(0,11).concat(Number(endHour.substring(12,13)-1)).concat(endHour.substring(13));
            console.log('Fecha Recibida: ' + dateNow, 'startHour: ' + startHour, 'endHour: ' + endHour);

            try {
                const temp = await Temperature.find({$and: [{createdAt: {$gte: startHour}}, {createdAt: {$lt: endHour}}, {deviceSerial: deviceSerial}]}, {_id: 0, createdAt:1, updatedAt: 0, __v: 0});
                
                return res.status(200).send({
                    auth: true,
                    temp});
                
            } catch (error) {
                return res.status(400).send({
                    auth: true,
                    message: "An error occured, please contact to Adminitrator!" });
            }

        }
    },
}

module.exports = thermostatController;