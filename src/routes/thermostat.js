'use strict'

const express = require('express');
const router = express.Router();

const thermostatController = require('../controllers/thermostat');
const verifyToken = require('../controllers/verifyToken');

router.get ('/thermostat/temp', verifyToken, thermostatController.temp);

module.exports = router;