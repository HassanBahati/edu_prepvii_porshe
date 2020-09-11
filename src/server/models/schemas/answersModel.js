const mongoose = require("mongoose");
const Schema = mongoose.Schema

let answerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    question: {
        type : Schema.Types.ObjectId,
        ref: "Questions" 
        
    },
    answer: {
        type: String
    }
    
});

module.exports = mongoose.model("Answers", answerSchema);