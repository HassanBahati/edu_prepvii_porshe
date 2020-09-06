const Questions = require("../src/server/models/schemas/questionsModel");

exports.test = (req  , res)=>{
    res.send("Greetings from porsche , this is his first perfectly working route and database in mongoose")
};