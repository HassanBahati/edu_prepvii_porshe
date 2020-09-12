const User = require("../models/schemas/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//import validation schema
const signInValidation = require("../helpers/schemas/users");

//controllers for users to signin 
module.exports.user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email exists already"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    // let data = req.body
                    // signInValidation(data);
                    if (err) {
                        return res.status(500).json({
                            error: "err"
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    message: "User created",
                                    user: user.name
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });

            }
        });
        // .catch(err => {
        //     console.log(err);
        //     res.status(500).json({
        //         error: err
        //     });
        // })
};



//controller for users to login 

module.exports.userLogin = (req, res, next) => {
    const user =User.findOne({ email: req.body.email})
    .exec()
    .then(user => {
        console.log(user)
        // const {error} = LoginValidation(req.body);
        if (user === null) {
            return res.status(401).json({
                message: "user doesnot exist"
            });
        }
        else if(user.length < 1) {
             {
                return res.status(401).json({
                    message: "Auth failed, wrong password"
                });
            }
        }
        bcrypt.compare(req.body.password, user.password, (err, result) =>{
            if (err) {
                return res.status(401).json({
                    message: "Auth failed, wrong email"
                })
            }
             else {
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                }, 
                process.env.JWT_KEY, {
                   expiresIn: "1h"  
                }
                )
                return res.status(200)
                .json({
                    message: "Auth successful, User succesfully logged in",
                    token: token
                });
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




