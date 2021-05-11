'use strict'
const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyJWT = (token = '') => {

    try {
        const {id} = jwt.verify(token, config.secret);

        return [true, id];
        
    } catch (error) {
        
        return [false, null];

    }
}

module.exports = verifyJWT;