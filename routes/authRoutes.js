const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

const { verifyPassword, generateToken } = require("../utils/auth");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const passwordIsValid = await verifyPassword(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user);

  res.json({ token });
});

module.exports = router;
