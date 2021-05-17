'use strict'

const express = require('express');
const router = express.Router();

const thermostatController = require('../controllers/thermostat');
const verifyToken = require('../controllers/verifyToken');

router.get ('/thermostat/temp', verifyToken, thermostatController.temp);
router.get ('/thermostat/tempLastDay', verifyToken, thermostatController.tempLastDay);
router.get ('/thermostat/tempLastHour', verifyToken, thermostatController.tempLasthour);

module.exports = router;