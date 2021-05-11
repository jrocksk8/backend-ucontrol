'use strict'

const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config');

var userController = {

    // LOGIN
    signin: async function(req, res){

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email: email });

            if(!user){
                return res.status(401).send({
                    auth: false,
                    message: "The email does not exists!" });
            }

            const validPassword = await user.validatePassword(password);

            if(!validPassword){
                return res.status(401).send({
                    auth: false,   
                    message: 'The password is not correct!' });
            }

            const token = jwt.sign({id: user._id}, config.secret, { expiresIn: '48h' });
            
            return res.status(200).send({
                auth: true,
                name: user.name,
                //lastname: user.lastname,
                message: 'The passwords is correct, Access granted!.',
                token: token });        
            
        } catch (error) {
            console.log('An error occured!, please contact to administrator.');

            return res.status(401).send({
                auth: false,
                message: "An error occured!, please contact to administrator."});
        }
    },

    // REGISTER A NEW USER
    signup: async function(req, res){

        const { name, email, password, rpassword} = req.body;

        try {
            const userVerify = await User.findOne({ email: email });

            if(userVerify){
                return res.status(401).send({
                    auth: false,
                    message: "The email already exists!" });
            }

            if(password != rpassword){
                return res.status(401).send({
                    auth: false,
                    message: "The passwords don't match" });
            }

            const user = new User ({
                name: name,
                //lastname: lastname,
                email: email,
                password: password,
                rpassword: rpassword
            });

            user.password = await user.encryptPassword(user.password);
            user.rpassword = await user.encryptPassword(user.rpassword);

            const token = jwt.sign({id: user._id}, config.secret, { expiresIn: '48h' });

            await user.save();
            console.log(user);
            
            return res.status(201).send({
                auth: true,
                name: name,
                //lastname: user.lastname,
                message: 'User Added Successfully!',
                token: token });

        } catch (error) {
            console.log('An error occured!, please contact to administrator.');

            return res.status(401).send({
                auth: false,
                message: 'An error occured!, please contact to administrator.'});
        }
    },

    // RENEW TOKEN
    renewToken: async function(req, res){
            
        try {
            const token = jwt.sign({id: req.userId}, config.secret, { expiresIn: '48h' });  

            return res.status(200).send({
                auth: true,
                message: 'The Token has been renewed!',
                token: token });
            
        } catch (error) {
            console.log('An error occured!, please contact to administrator.');

            return res.status(401).send({
                auth: false,
                message: 'An error occured!, please contact to administrator.'});
        }
    },

    // FORGOT PASSWORD
    forgotPassword: function(req, res){

        return res.status(200).send({
            message: 'Forgot Password?'
        });
    },

};

module.exports = userController;