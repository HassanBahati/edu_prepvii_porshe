const express = require("express")
const router = express.Router();
//require controllers
const questionController = require("../controllers/question-controller")

//testing 
router.get("/", questionController.test);


//post question 
router.post("/create", questionController.questionCreate);

//get one question
router.get("/:id", questionController.questionDetails);


// delete question
router.delete("/:id/delete", questionController.questionDelete);

//get all questions
router.get("/allQuestions", questionController.allQuestions);






module.exports = router;

