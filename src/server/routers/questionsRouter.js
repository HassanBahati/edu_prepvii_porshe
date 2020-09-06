const express = require("express")
const router = express.Router();
//require controllers
const questionController = require("../src/server/controllers/questionController")

//testing 
router.get("/", questionController.test);


module.exports = router;

