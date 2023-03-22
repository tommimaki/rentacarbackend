// routes/demoLogin.js

const express = require("express");
const router = express.Router();
const demoLoginController = require("../controllers/demoLoginController");

router.post("/", demoLoginController.login);

module.exports = router;
