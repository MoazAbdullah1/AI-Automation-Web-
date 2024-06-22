const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

require("../db/conn");
const User = require("../models/user-model");

router.get("/home", (req, res) => {
  res.send("Hello, MERN! Soon home Coming Udpates... form router js");
});

// REGISTRATION ROUTES

// Stored data in MongoDB using Promises

// router.post("/register", (req, res) => {
//   const { name, email, phone, password, cpassword } = req.body;

//   if (!name || !email || !phone || !password || !cpassword) {
//     return res.status(422).json({ error: "Plz Fill the feild Properly. " });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email already exist." });
//       }
//       const user = new User({ name, email, phone, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "Registered Successfully" });
//         })
//         .catch((err) => res.status(500).json({ error: "Failed Registration" }));
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   //   console.log(req.body);
//   // show data to port 5000
//   // console.log(name);
//   // console.log(email);

//   // posting data from PostMan
//   //   res.json({ message: req.body });
//   //   res.send("send ho raha ha");
// });

// Using Async Function And Await Function
router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Plz Fill the feild Properly. " });
  }
  if (password !== cpassword) {
    return res.status(422).json({ error: "Passwords do not match." });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exist." });
    }

    const user = new User({ name, email, phone, password, cpassword });

    await user.save();

    res.status(201).json({ message: "Registered Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed Registration" });
  }
});

// LOGIN ROUTES

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields properly." });
  }

  try {
    const userLogin = await User.findOne({ email: email });

    if (!userLogin) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);
    const token = await userLogin.generateAuthToken();

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    } else {
      res.status(200).json({ message: "Login Successful" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
