'use strict'

const express = require('express');
const router = express.Router();

const devicesController = require('../controllers/devices');
const verifyToken = require('../controllers/verifyToken');

router.get ('/listDevices', verifyToken, devicesController.listDevices);
router.get ('/userDevices', verifyToken, devicesController.listUserDevices);
router.post('/editStatusDevice', verifyToken, devicesController.editStatusDevice)
router.post ('/addDevice', verifyToken ,devicesController.addDevice);
router.post ('/editDevice', verifyToken ,devicesController.editDevice);
router.post ('/deleteDevice', verifyToken ,devicesController.deleteDevice);

module.exports = router;