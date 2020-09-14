const User = require("../models/schemas/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//import validation schema
const signInValidation = require("../helpers/schemas/users")

//controllers for users to signin 
exports.userSignUp = (req  , res, next)=>{
    User.find({email: req.body.email })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "Email exists already"
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                //const {error} = signInValidation(req.body);
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
                            username: user.name,
                            id: user._id
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
    //const result = Joi.validate(req.body, signInValidation)
};



//controller for users to login
exports.userLogin = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) {
           return res.status(401).json({
               message: "Auth failed, wrong email"
           })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth failed"
                })
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    id: user[0]._id
                }, process.env.JWT_KEY,
                {
                    expiresIn : "1hr"
                });
                return res.status(200).json({
                    message: "Auth Successful, successfully logged in",
                    token: token
                })
            }
            res.status(401).json({
                message: "Auth failed"
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};







 

