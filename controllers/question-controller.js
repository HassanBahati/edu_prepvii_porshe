const Questions = require("../models/questions-model");

exports.test = (req  , res)=>{
    res.send("Greetings from hassan , this is his first perfectly working route and database in mongoose")
};

//create a question
exports.questionCreate = (req, res) => {
  let question = new Questions({
    name: req.body.name,
  
  });
  question.save((err) => {
    if (err) return next(err);
    res.send({
      status: 200,
      message: "Question posted successfully!",
    });
  });
};

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

