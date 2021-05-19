'use strict'

const express = require('express');
const router = express.Router();

const thermostatController = require('../controllers/thermostat');
const verifyToken = require('../controllers/verifyToken');

router.post ('/thermostat/data', verifyToken, thermostatController.data);
router.post ('/thermostat/dataLastWeek', verifyToken, thermostatController.dataLastWeek);
router.post ('/thermostat/dataLastDay', verifyToken, thermostatController.dataLastDay);
router.post ('/thermostat/dataLastHour', verifyToken, thermostatController.dataLasthour);

module.exports = router;