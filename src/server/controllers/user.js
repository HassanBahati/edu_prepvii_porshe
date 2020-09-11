const User = require("../models/schemas/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//import validation schema
const signInValidation = require("../helpers/schemas/users")

//controllers for users to signin 
exports.user = (req  , res, next)=>{
    User.find({email: req.body.email })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "Email exists already"
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                const {error} = signInValidation(req.body);
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }else {
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
                            user: user.name, user_id
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
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
};



//controller for users to login 

exports.userLogin = (req, res, next) => {
    User.find({ email: req.body.email})
    .exec()
    .then(user => {
        console.log(user)
        const {error} = LoginValidation(req.body);
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
             else {
                const token = jwt.sign({
                    email: [0].email,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY, {
                   expiresIn: "1h"  
                }
                )
                return res.json({
                    message: "Auth successful, User succesfully logged in",
                        token: token
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




