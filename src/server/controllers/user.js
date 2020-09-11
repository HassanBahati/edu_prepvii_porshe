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
                            user: user._id
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






