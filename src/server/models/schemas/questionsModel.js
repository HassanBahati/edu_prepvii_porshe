const mongoose = require("mongoose");
const Schema = mongoose.Schema

let questionsSchema = new Schema({
    question: {
        type : String,
        required: true
    },
    
});

module.exports = mongoose.model("Questions", questionsSchema);