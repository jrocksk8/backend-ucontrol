'use strict'

const express = require('express');
const router = express.Router();

const roomsController = require('../controllers/rooms');
const verifyToken = require('../controllers/verifyToken');

router.post ('/addRoom', verifyToken, roomsController.addRoom);
router.post ('/editRoom', verifyToken, roomsController.editRoom);
router.post ('/deleteRoom', verifyToken, roomsController.deleteRoom);
router.get ('/userRooms', verifyToken, roomsController.userRooms);
router.get ('/userRoomsDevices', verifyToken, roomsController.userRoomsDevices);
router.post ('/roomDevices', verifyToken, roomsController.roomDevices);

module.exports = router;