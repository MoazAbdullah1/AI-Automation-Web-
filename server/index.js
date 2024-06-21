const express = require("express");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

// give path of dotenv
dotenv.config({ path: "./config.env" });

require("./db/conn");
// const User = require("./models/user-model");

app.use(express.json());
// make connection with router to make code simple and easy
app.use(require("./router/auth"));

const PORT = process.env.PORT;

// Authentecation
const middleware = (req, res, next) => {
  console.log(`Hello Middleware santax`);
};

middleware();

// Arrow Function
app.get("/home", middleware, (req, res) => {
  res.send("Hello, MERN! Soon home Coming Udpates... from index js");
});

app.get("/", (req, res) => {
  res.send("Hello, MERN! Soon LOL Coming Udpates...");
});

app.get("/login", (req, res) => {
  res.send("Hello, MERN! Soon Login Coming Udpates...");
});

// Arrow Function to check port is listening
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
