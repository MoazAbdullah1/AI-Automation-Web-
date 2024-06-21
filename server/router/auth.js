const express = require("express");

const router = express.Router();

router.get("/home", (req, res) => {
  res.send("Hello, MERN! Soon home Coming Udpates... form router js");
});

router.post("/register", (req, res) => {
  console.log(req.body);
  res.json({ message: req.body });
  //   res.send("send ho raha ha");
});

module.exports = router;
