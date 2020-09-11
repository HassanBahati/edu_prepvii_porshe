const express = require("express");
const router = express.Router();
//require controllers


const questionController = require("../controllers/questionsController")

//post question 
router.post("/create", questionController.questionCreate);

//get one question
router.get("/:id", questionController.questionDetails);


// delete question
router.delete("/:id", questionController.questionDelete);

//get all questions
router.get("/all", questionController.allQuestions);



module.exports = router;

