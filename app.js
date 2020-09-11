const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config()

const app = express();
const PORT= process.env.PORT || 6000



// routes constants

const questions = require("./src/server/routers/questionsRouter");
const answers = require("./src/server/routers/answersRouter");
const users = require("./src/server/routers/userRoute");



//connect to mongoose
let mongoDB = process.env.MONGODB_URL
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.Promise = global.Promise;
let db = mongoose.connection
//db.on("error", console.error.bind(console, "Failed to connect to database"));
db.once("open", () => console.log("Connected to db"))
db.on("error", (error) => {
    console.log("Failed to connect to db", error )
});


///middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api", (req, res)=>{
    res.send("This is the porsche app for edu api development project")
});

  
app.use("/api/answers", answers);
app.use("/api/questions", questions);
app.use("/api/auth", users);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

