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
          message: "Question posted",
          _id: new mongoose.Types.ObjectId(),
           question: req.body.question
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
//all questions
exports.allQuestions = async (req, res, next) => {
  try{
const results = await Questions.find({}, {__v:0})
res.send(results)
  }catch (error) {
console.log(error.message);
  }
}

//all questions
/*exports.allQuestions = async (req, res, next) => {
    try {
      const result = await Questions.find({}, { __v: 0 })
      if (!result) return res.json({ error: 404, message: "Not Found" });
      res.send(result);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };
*/ 
// get question by Id
exports.questionDetails = (req, res, next) => {
  Questions.findById(req.params.id, (err, question) => {
    if (err) return next(err);
    res.json(question);
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


