const Questions = require("../models/schemas/questionsModel");
const mongoose  = require("mongoose");


//posting a question
exports.questionCreate = (req, res, next) => {
  Questions.find({question: req.body.question })
  .exec()
  .then(question =>{
    if (question.length >=1 ) {
      return res.status(409).json({
        message: "Question exists already"
    });
    }
    else{
      const question = new Questions({
        _id: new mongoose.Types.ObjectId(),
        question: req.body.question
    });
    question
    .save()
    .then(result => {
      res.status(201).json({
          message: "Question posted"
      });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
  })
      }
  })
}





// get question by Id
exports.questionDetails = (req, res, next) => {
  Questions.findById(req.params.id, (err, question) => {
    if (err) return next(err);
    res.send(question);
  });
};



// delete a question by ID
exports.questionDelete = (req, res) => {
  Questions.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
    res.send({
      status: 200,
      message: "Question deleted successfully!",
    });
  });
};

//get all questions
exports.allQuestions = (req, res) => {
  Questions.find()
  .exec()
  .then(result)
  .catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    });
})
}
