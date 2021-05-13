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

}

module.exports = thermostatController;