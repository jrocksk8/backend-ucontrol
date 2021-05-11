'use strict'

const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.js');
const verifyToken = require('../controllers/verifyToken');

router.post ('/signin', UsersController.signin);
router.get ('/signin/renew', verifyToken, UsersController.renewToken);
router.post ('/signup', UsersController.signup);
router.get ('/forgot-password', UsersController.forgotPassword);

module.exports = router;