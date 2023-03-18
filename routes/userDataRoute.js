const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware"); // Update this import
const User = require("../models/user");

router.get("/api/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
