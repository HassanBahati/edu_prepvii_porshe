const mongoose = require("mongoose");
const Schema = mongoose.Schema

let questionsSchema = new Schema({
    name: {
        type : String,
        max : 100,
        required: true

    },
    Date :{
        default: Date.now,
        type : Date,
        required: true
    }

});

module.exports = mongoose.model("Questions", questionsSchema);