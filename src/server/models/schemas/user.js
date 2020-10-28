const mongoose = require("mongoose");
const Schema = mongoose.Schema

let userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    Username: {
        type: String,

    },

    email: {
        type : String,
        required: true,
        unique: true,
        
    },
    password :{
        type : String,
        required: true

    }

});

module.exports = mongoose.model("User", userSchema);