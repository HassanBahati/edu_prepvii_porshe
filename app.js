const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const  cors = require("cors")
require("dotenv").config()


const app = express();
const PORT= process.env.PORT || 5000

///middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes constants

const questions = require("./src/server/routers/questionsRouter");
const answers = require("./src/server/routers/answersRouter");
const users = require("./src/server/routers/userRoute");



//connect to mongoose
const mongoDB = process.env.mongoDB_URI
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




app.get("/", (req, res)=>{
    res.json({
        message: "This is the api porsche app project"
    })
});

  
app.use("/api/answers", answers);
app.use("/api/questions", questions);
app.use("/api/auth", users);


//for cross origin resource sharing 
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*") //update to match detail you make requests from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

