const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config()

const app = express();
const PORT= process.env.PORT || 6000



// routes constants
const questions = require("./routers/questionsRouter");




//connect to mongoose
let mongoDB = process.env.MONGODB_URL 
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
} );

mongoose.Promise = global.Promise;
let db = mongoose.connection
db.on("error", console.error.bind(console, "Failed to connect to database"));

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res)=>{
    res.send("This is the porsche app for edu project")
});

app.use("/api/v1/questions", questions)

// the endpoints in the browser should be like
// https://localhost:6000/api/v1/questions/   =>this will return Greetings from the test controller  


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

