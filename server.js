const express = require("express");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const helmet = require("helmet");
const { checkAuthenticated } = require("./middleware");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const initializePassport = require("./passport/passportConfig");

// if not in production load donenv and variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// connect to mongodb with mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
// Show connected to database or error
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => {
  console.log("mongodb connection established");
});

// middlewares
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(helmet());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: connection }),
  })
);

// Passport init
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/user", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes/authRoutes"));
app.use("/auth/google", require("./routes/authRoutes/googleAuthRoutes"));
app.use("/list", require("./routes/listRoutes"));
app.use("/list/:id/item", require("./routes/itemRoutes"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World", severity: "success" });
});

// Listen
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
