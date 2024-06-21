const express = require("express");

const router = express.Router();

router.get("/home", (req, res) => {
  res.send("Hello, MERN! Soon home Coming Udpates... form router js");
});

router.post("/register", (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    // return res.status;
    return res.json({ error: "Plz Fill the feild Properly. " });
  }
  //   console.log(req.body);
  // show data to port 5000
  console.log(name);
  console.log(email);

  // posting data from PostMan
  //   res.json({ message: req.body });
  //   res.send("send ho raha ha");
});

module.exports = router;
