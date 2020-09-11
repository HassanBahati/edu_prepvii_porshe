const express = require("express")
const router = express.Router();
const verify = require("../helpers/validation");

//require controllers
const answerController = require("../controllers/answersController")


//post an answer
router.post("/post", answerController.answerCreate)

//show all answers to a question
router.get("/questions/<questionId>/answers", answerController.answerCreate)

// update an answer by author only
 //router.put("/questions/<questionId>/answers/<answerId>", verify, answerController.answerUpdate)


module.exports = router;

