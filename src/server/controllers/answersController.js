const Answers = require("../models/schemas/answersModel");
const mongoose  = require("mongoose");



//posting answer
exports.answerCreate = (req, res, next) => {
  Answers.find({answer: req.body.answer})
  .exec()
  .then(answer =>{
    if (answer.length >=1 ) {
      return res.status(409).json({
        message: "Answer exists already"
    });
    }
    else{
      const answer = new Answers({
        _id:  mongoose.Types.ObjectId(),
        question: req.body.questionId,
        answer: req.body.answer
    });
    answer
    .save()
    .then(result => {
      res.status(201).json({
          message: "Answer posted"
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

// update an answer by author only
exports.answerUpdate = (req, res) => {
  Answers.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err, answer) => {
      if (err) return next(err);
      res.send({
        status: 200,
        message: "Answer udpated.",
      });
    }
  );
};
