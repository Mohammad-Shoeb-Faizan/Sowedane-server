// index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");
const updateProfileRoute = require("./routes/updateProfile");
const profileRoute = require("./routes/myprofile");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello, Express with CORS and .env!");
});

app.use("/api", signupRoute);
app.use("/api", signinRoute);
app.use("/api", updateProfileRoute);
app.use("/api", profileRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
