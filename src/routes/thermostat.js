'use strict'

const express = require('express');
const router = express.Router();

const thermostatController = require('../controllers/thermostat');
const verifyToken = require('../controllers/verifyToken');

router.post ('/thermostat/temp', verifyToken, thermostatController.temp);
router.post ('/thermostat/tempLastDay', verifyToken, thermostatController.tempLastDay);
router.post ('/thermostat/tempLastHour', verifyToken, thermostatController.tempLasthour);

module.exports = router;