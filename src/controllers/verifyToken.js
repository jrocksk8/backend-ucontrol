'use strict'
const jwt = require('jsonwebtoken');
const config = require('../config');


function verifyToken (req, res, next){
    const token = req.headers['x-access-token'];

        try {

            if (!token){
                return res.status(401).send({
                    auth: false,
                    message: 'No token provided!'});
            }

            const decoded = jwt.verify(token, config.secret);
            req.userId = decoded.id;
            //console.log(req.userId);
            next();
            
        } catch (error) {
            
            if(error['expiredAt']){
                console.log('The token expired on ' + error['expiredAt']);

                return res.status(401).send({
                    auth: false,
                    message: 'The token expired on ' + error['expiredAt']});
            }

            return res.status(401).send({
                auth: false,
                message: 'The token is incorrect!'});
        }       
}

module.exports = verifyToken;