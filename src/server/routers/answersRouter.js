const express = require("express")
const router = express.Router();
const verify = require("../helpers/validation");

//require controllers
const answerController = require("../controllers/answersController")


//post an answer
router.post("/create", answerController.answerCreate)

//show all answers to a question
router.get("/", answerController.answersAll)

// update an answer by author only
 //router.put("/questions/<questionId>/answers/<answerId>", verify, answerController.answerUpdate)

 //get all answers
//router.get("/:id", answerController.allAnswers);


module.exports = router;

