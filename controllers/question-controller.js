const Questions = require("../models/questions-model");
const mongoose  = require("mongoose");

exports.test = (req  , res)=>{
    res.send("Greetings from team_porsche, please add /create to post your questions")
};

//posting a question
exports.questionCreate = (req, res, next) => {
  const question =new Questions ({
     _id: new mongoose.Types.ObjectId(),
     name: req.body.name
  })
  question
  .save()
  .then(result => {
    res.status(201).json({
      message: "User created"
    })
  })
  .catch()
}


// get question by Id
exports.questionDetails = (req, res, next) => {
  question.findById(req.params.id, (err, question) => {
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
  Questions.find((err, question) => {
    if (err) return console.error(err);
    res.send(question);
    console.log(question.length);
    
  });
};

