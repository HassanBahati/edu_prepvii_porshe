
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/schemas/profile")

//require validation schema 
const LoginValidation = require("../helpers/schemas/proflies")



//controller for users to login 

exports.userLogin = (req, res, next) => {
    Profile.find({ email: req.body.email})
    .exec()
    .then(user => {
        //const {error} = LoginValidation(req.body);
        if (user.length < 1) {
            return res.status(401).json({
                message: "Auth failed, wrong password"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, res) =>{
            if (err) {
                return res.status(401).json({
                    message: "Auth failed, wrong email"
                })
            }
            if (result) {
                const token = jwt.sign({
                    email: [0].email,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY, {
                   expiresIn: "1h"  
                }
                )
                return res.status(200).header("auth-token", token).json({
                    message: "Auth successful, User succesfully logged in",
                   // token: token
                })
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
};

