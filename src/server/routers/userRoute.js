const express = require("express")
const router = express.Router();
//require controllers
const userController = require("../controllers/user");


//signup
router.post("/signup", userController.user);

//login
router.post("/login", userController.userLogin);



module.exports = router;