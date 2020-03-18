const express = require("express");
const passport = require("passport");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const initializePassport = require("./passportConfig");
initializePassport(passport);

require("dotenv").config();

// connect to mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => {
  console.log("mongodb connection established");
});

// middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/user", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("hello world");
});

// Listen
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
