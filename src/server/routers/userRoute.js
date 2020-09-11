const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//require controllers
const userController = require("../controllers/user")
const profileController = require("../controllers/profile")

//signup
router.post("/signup", userController.user);

//login
router.post("/login", profileController.userLogin);



module.exports = router;