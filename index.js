const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config()

const app = express();
const PORT= process.env.PORT || 6000



// routes constants
const users = require("./routes/user");




//connect to mongoose
let mongoDB = process.env.MONGODB_URI 
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

app.get("/api/v1", (req, res)=>{
    res.send("This is the porsche app for edu project")
});

 // https://localhost:6000/users/   =>this will return Greetings from the test controller  
app.use("/api/v1/users", users)


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

